import Db = require("./utils/db");
import path = require("path");

const params: object = Object.assign({}, Db.getConnectionParams(), {
    migrations: {
        directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, "seeds")
    }
});

export = params;