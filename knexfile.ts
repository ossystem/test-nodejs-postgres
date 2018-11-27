const {getConnectionParams} = require("./utils/db");
const path = require("path");

const params: object = Object.assign({}, getConnectionParams(), {
    migrations: {
        directory: path.resolve(__dirname, "migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, "seeds")
    }
});

export = params;