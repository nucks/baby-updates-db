import * as dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString = process.env.CONNECTION_STRING;

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

export let db = conn.db("prod_updates");