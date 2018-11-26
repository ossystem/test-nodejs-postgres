import {Request, Response, Controller, Get, Post} from '@decorators/express';
import API = require("./API");

@Controller("/users")
class UserController extends API {
    @Get("/:id")
    async getUser (@Request() req: any, @Response() res: any) {
        res.send({
            route: "/users/:id",
            id: req.params.id
        });
    }

    @Post("/")
    async createUser (@Request() req: any, @Response() res: any) {
        res.send({
            route: "/users"
        });
    }
}

export = UserController;