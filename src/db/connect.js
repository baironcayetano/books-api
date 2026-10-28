import { MongoClient } from "mongodb";

let database;

/** Creates a connection to mongoAtlas */
const connectToDb = async () => {
    const connectionString = process.env.MONGO_DB_URI;
    if (!connectionString){
        throw new Error("The MONGO_DB_URI variable is not defined in the .env file");
    }

    const client = new MongoClient(connectionString);
    await client.connect();

    database = client.db(process.env.MONGO_DB_NAME || "practice");
    return database;
}

/** returns the selected database */
const getDb = () => {
    if(!database){
        throw new Error("Database not initialized. Call connectToDb first.");
    }
    return database;
}

export {connectToDb, getDb};
