import * as dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://brennuck:${process.env.MONGODB_PASSWORD}@journiedb.epkam7m.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

export let db = conn.db("prod_updates");
