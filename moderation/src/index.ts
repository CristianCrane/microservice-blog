import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors()); // just a test project. dont allow all cors obviously

/**
 * Process CommentCreated events for moderation
 */
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    console.log(type, data);
    const { postId, comment } = data;
    const { id: commentId, unModeratedContent } = comment;

    // fake a little processing then emit a CommentModerated event
    setTimeout(() => {
      const containsOrange = unModeratedContent
        .toLowerCase()
        .includes("orange");
      const status = containsOrange ? "REJECTED" : "APPROVED";

      console.log("Comment processed", commentId, status);

      axios.post(`${process.env.EVENT_BUS_URL}/events`, {
        type: "CommentModerated",
        data: {
          postId,
          commentId,
          status,
        },
      });
    }, 3000);
  }

  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
