import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

const urls: string[] = [
  `${process.env.POSTS_URL}/events`,
  `${process.env.COMMENTS_URL}/events`,
  `${process.env.QUERY_SERVICE_URL}/events`,
  `${process.env.MODERATION_URL}/events`,
];

const events: { type: string; data: any }[] = [];

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // publish event to all listeners
  urls.forEach(async (url) => {
    try {
      await axios.post(url, event);
    } catch (e) {
      console.error(`Failed to post event to ${url}`, e);
    }
  });

  res.sendStatus(200);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
