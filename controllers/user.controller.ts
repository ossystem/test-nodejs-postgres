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

            if (body.id) {
                await db("users")
                    .update({
                        email: body.email,
                        first_name: body.first_name,
                        last_name: body.last_name
                    })
                    .where("id", body.id);

                result = await findById("users", body.id);
            } else {
                const id: any = await db("users")
                    .insert({
                        email: body.email,
                        first_name: body.first_name,
                        last_name: body.last_name
                    })
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