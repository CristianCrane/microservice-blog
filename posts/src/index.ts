import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(cors()); // just a test project. dont allow all cors obviously

// faking a db
const posts: Record<string, object> = {};

/**
 * Create a new post
 */
app.post("/posts/create", async (req: Request, res: Response) => {
  // just generating a random id for a new post
  const id = randomBytes(4).toString("hex");

  // save the new post in our fake db
  const { title } = req.body;
  posts[id] = { id, title };

  // publish new post event
  await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
    type: "PostCreated",
    data: { id, title },
  });

  // send back the id we created
  res.status(201).send(posts[id]);
});

/**
 * Processes events from the eventbus
 */
app.post("/events", async (req, res) => {
  // todo: process events
  console.log("Received event:", req.body);
  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("version 4 baby");
  console.log(`Listening on ${port}`);
});
