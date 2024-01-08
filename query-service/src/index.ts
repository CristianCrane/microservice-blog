import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import {insertComment, insertPost, listPosts, Post} from "./services/postsService";

const app = express()
app.use(bodyParser.json())
app.use(cors()) // just a test project. dont allow all cors obviously

/**
 * Returns all posts with comments
 */
app.get('/posts', (req: Request, res: Response) => {
  const posts = listPosts()
  res.status(200).send(posts)
})

/**
 * Processes events from the eventbus
 */
app.post('/events', async (req, res) => {
  console.log('Processing event', req.body)
  const {type, data} = req.body

  switch (type) {
    case 'PostCreated':
      const {id, title} = data
      insertPost({id, title, comments: []})
      break

    case 'CommentCreated':
      const {
        postId,
        id: commentId,
        content
      } = data
      insertComment(postId, {id: commentId, content})
      break

    default:
      console.warn('Unsupported event type', req.body.event)
  }

  res.sendStatus(200)
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})