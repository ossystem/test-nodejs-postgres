const {Request, Response, Controller, Get, Post} = require("@decorators/express");
import API = require("./API");
const {getConnection, findById} = require("../utils/db");

const db = getConnection();

@Controller("/users")
class UserController extends API {
    @Get("/:id")
    async getUser (@Request() req: any, @Response() res: any) {
        let result: any = {};

        try {
            let id: any = null;

            try {
                id = parseInt(req.params.id);
            } catch (ex) {}

            if (!isNaN(id)) {
                result = await findById("users", id);
                result = result || {};
            }
        } catch (ex) {
            console.log(__filename, "exception:", ex);
        }

        res.send(result);
    }

    @Post("/")
    async createUser (@Request() req: any, @Response() res: any) {
        let result: any = {};

        try {
            const body: any = req.body;
            const writableFields: string[] = [
                "email",
                "first_name",
                "last_name"
            ];

            if (body.id) {
                const updatableFields: any = {};

                Object.keys(body).forEach((field) => {
                    if (writableFields.includes(field) && (field !== "id")) {
                        updatableFields[field] = body[field];
                    }
                });

                await db("users")
                    .update(updatableFields)
                    .where("id", body.id);

                result = await findById("users", body.id);
                result = result || {};
            } else {
                const insertableFields: any = {};

                Object.keys(body).forEach((field) => {
                    if (writableFields.includes(field) && (field !== "id")) {
                        insertableFields[field] = body[field];
                    }
                });

                const id: any = await db("users")
                    .insert(insertableFields)
                    .returning("id")
                    .into("users");

                result = await findById("users", id[0]);
            }
        } catch (ex) {
            console.log(__filename, "exception:", ex);
        }

        res.send(result);
    }
}

export = UserController;