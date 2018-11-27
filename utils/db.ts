const config = require("../config.json");

let connection: any;

const getConnectionParams = () => {
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
};

const getConnection = () => {
    if (!connection) {
        try {
            connection = require("knex")(getConnectionParams());

            console.log("Connection to DB has established successfully.");
        } catch (ex) {
            console.log("Connection to DB is unavailable. Exception:", ex);
        }
    }

    return connection;
};

const closeConnection = () => {
    if (connection) {
        connection.destroy();
        connection = null;

        console.log("Connection to DB has been closed successfully.");
    }
};

const findById = async (table: string, id: string|number) => {
    return await getConnection()
        .select()
        .from(table)
        .where("id", id)
        .first();
};

export = {
    getConnectionParams,
    getConnection,
    closeConnection,
    findById
};