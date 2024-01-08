// faking a db, just a test project
export type Comment = { id: string, content: string }
export type Post = {
  id: string,
  title: string,
  comments: Comment[]
}
export type Posts = Record<string, Post>
const posts: Posts = {}

export const insertPost = (post: Post) => {
  const {id, title} = post
  posts[id] = {comments: [], id, title}
}

export const insertComment = (postId: string, comment: Comment) => {
  if (!posts[postId]) {
    console.warn('Invalid postId', postId)
    return
  }
  const post = posts[postId]
  posts[postId] = {...post, comments: [...post.comments, comment]}
}

export const listPosts = () => {
  return Object.values(posts)
}