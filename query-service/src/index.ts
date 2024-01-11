import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { insertPost, listPosts, updateComment } from "./services/postsService";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors()); // just a test project. dont allow all cors obviously

/**
 * Returns all posts with comments
 */
app.get("/posts", (req: Request, res: Response) => {
  const posts = listPosts();
  res.status(200).send(posts);
});

function handleEvent(event: { type: string; data: any }) {
  const { type, data } = event;

  if (type === "PostCreated") {
    const { id, title } = data;
    insertPost({ id, title });
  }

  if (type === "CommentCreated") {
    const { postId, comment } = data;
    updateComment(postId, comment);
  }

  if (type === "CommentUpdated") {
    const { postId, updatedComment } = data;
    console.log("Comment updated", data);
    updateComment(postId, updatedComment);
  }
}

/**
 * Processes events from the eventbus
 */
app.post("/events", async (req, res) => {
  const event = req.body;
  handleEvent(event);
  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`Listening on ${port}`);

  // sync events on startup
  const res = await axios.get(`${process.env.EVENT_BUS_URL}/events`);
  const events: { type: string; data: any }[] = res.data;
  events.forEach(handleEvent);
});
