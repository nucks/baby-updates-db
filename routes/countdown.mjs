import express from "express";
import { db } from "../mongo.mjs";
import { ObjectId } from "mongodb";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("countdown");
    let query = { _id: new ObjectId("6403b7083f72fbec3d878f5e") };
    let results = await collection.findOne(query);

    res.send(results).status(200);
});

router.patch("/update", async (req, res) => {
    const query = { _id: new ObjectId("6403b7083f72fbec3d878f5e") };
    const updates = {
        $set: { coutdown: req.body.coutdown },
    };

    let collection = await db.collection("countdown");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

router.post("/text", async (req, res) => {
    const numbers = process.env.NUMBERS.split(" ");

    numbers.map((number, index) => {
        setTimeout(() => {
            fetch("https://textbelt.com/text", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: number,
                    message:
                        "Exciting news! Katie and Cameron are on their way to the hospital to welcome their new baby into the world.\n\nFollow along and get real-time updates by going to https://capriupdates.nucks.co",
                    key: process.env.TEXT_API_SECRET,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                });
        }, index * 3000);
    });
});

export default router;
