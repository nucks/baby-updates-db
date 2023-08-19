import * as dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(connectionString);

let db;

try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
} catch (e) {
    console.error(e);
}

export { db };
