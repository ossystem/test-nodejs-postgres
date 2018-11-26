const config = require("../config.json");

class Db {
    private static connection: any;

    public static getConnectionParams () {
        const dbConfig: any = config.db;

        return {
            client: "pg",
            connection: {
                host: dbConfig.host,
                user: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.dbName
            }
        }
    }

    public static getConnection () {
        if (!Db.connection) {
            try {
                Db.connection = require("knex")(Db.getConnectionParams());
                
                console.log("Connection to DB has established successfully.");
            } catch (ex) {
                console.log("Connection to DB is unavailable. Exception:", ex);
            }
        }

        return Db.connection;
    }

    public static closeConnection () {
        if (Db.connection) {
            Db.connection.destroy();
            Db.connection = null;

            console.log("Connection to DB has been closed successfully.");
        }
    }
}

export = Db;