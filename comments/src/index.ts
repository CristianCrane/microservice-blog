import express from 'express'
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from 'axios'
import 'dotenv/config'

const app = express()
app.use(bodyParser.json())
app.use(cors())

// fake db, just a test project
type PostId = string
type Comment = {
  id: string
  content: string
}
const commentsByPostId: Record<PostId, Comment[]> = {}

/**
 * Returns all comments for the given post ID
 */
app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id]

  if (!comments) {
    res.status(404).send(`Post with ID ${req.params.id} not found.`)
  }

  res.status(200).send(comments)
})

/**
 * Adds a new comment to the given post ID
 */
app.post('/posts/:id/comments', async (req, res) => {
  // fetch existing comments
  const comments = commentsByPostId[req.params.id] ?? []

  // add the new comment
  const id = randomBytes(4).toString('hex')
  const {content} = req.body
  comments.push({id, content})
  commentsByPostId[req.params.id] = comments

  // post new comment event
  await axios.post(`${process.env.EVENT_BUS_URL}/events`, {
    type: 'CommentCreated',
    data: {
      postId: req.params.id,
      id,
      content
    }
  })

  // send response
  res.status(201).send(comments)
})

/**
 * Processes events from the event-bus
 */
app.post('/events', (req, res) => {
  // todo: process events
  console.log('Received event:', req.body)
  res.sendStatus(200)
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})