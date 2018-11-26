import { Response, Params, Controller, Get, Post } from '@decorators/express';
import API = require("./API");

@Controller("/")
class UserController extends API {
    @Get("/users/:id")
    async getUser (@Response() res: any, @Params('id') id: string) {
        res.send({
            route: "/users/:id",
            id
        });
    }

    @Post("/users")
    async createUser (@Response() res: any) {
        res.send({
            route: "/users"
        });
    }
}

export = UserController;