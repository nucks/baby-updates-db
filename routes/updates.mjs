import express from "express";
import { db } from "../mongo.mjs";
import Pusher from "pusher";

const router = express.Router();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

// Get a list of 50 posts
router.get("/", async (req, res) => {
    res.send("yo").status(200);
});

// Fetches the latest posts
router.get("/latest", async (req, res) => {
    let collection = await db.collection("updates");
    let results = await collection.find().toArray();

    res.send(results).status(200);
});

// // Add a new document to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("updates");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);

    pusher.trigger("my-channel", "my-event", {
        message: "New update added!",
    });

    res.send(result).status(204);
});

export default router;
