import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// fake db, just a test project
type PostId = string;
type CommentId = string;
type Comment = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  content: string;
  unModeratedContent: string;
};
const commentsByPostId: Record<PostId, Record<CommentId, Comment>> = {};

/**
 * Returns all comments for the given post ID
 */
app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id];

  if (!comments) {
    res.status(404).send(`Post with ID ${req.params.id} not found.`);
  }

  res.status(200).send(comments);
});

/**
 * Adds a new comment to the given post ID
 */
app.post("/posts/:id/comments", async (req, res) => {
  // fetch existing comments
  const comments = commentsByPostId[req.params.id] ?? {};

  // add the new comment
  const { content } = req.body;
  const postId = req.params.id;
  const newCommentId = randomBytes(4).toString("hex");

  const newComment: Comment = {
    id: newCommentId,
    content: "Comment pending moderation",
    status: "PENDING",
    unModeratedContent: content,
  };

  comments[newCommentId] = newComment;
  commentsByPostId[postId] = comments;

  // post new comment event
  await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
    type: "CommentCreated",
    data: { postId, comment: newComment },
  });

  // send response
  res.status(201).send(comments);
});

/**
 * Processes events from the event-bus
 */
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    console.log(type, data);
    const { postId, commentId, status } = data;

    // update the comment
    const oldComment = commentsByPostId[postId][commentId];
    const updatedComment = { ...oldComment, status };

    // show the original content if its been approved
    updatedComment.content =
      status === "APPROVED"
        ? oldComment.unModeratedContent
        : "Comment removed.";

    commentsByPostId[postId][commentId] = updatedComment;

    // emit comment updated event
    await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
      type: "CommentUpdated",
      data: { postId, updatedComment },
    });
  }

  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
