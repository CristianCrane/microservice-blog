// faking a db, just a test project
export type Comment = {
  id: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  content: string;
};

export type Post = {
  id: string;
  title: string;
  comments: Record<string, Comment>;
};

export type Posts = Record<string, Post>;
const posts: Posts = {};

export const insertPost = (post: Omit<Post, "comments">) => {
  const { id, title } = post;
  posts[id] = { id, title, comments: {} };
  console.log("added post", posts);
};

export const updateComment = (postId: string, comment: Comment) => {
  try {
    const post = getPost(postId);
    post.comments[comment.id] = comment;
  } catch (e) {
    console.error("Failed to update comment", { postId, comment }, e);
  }
};

export const getPost = (postId: string) => {
  if (!posts[postId]) {
    throw new Error("Invalid post ID");
  }

  return posts[postId];
};

export const listPosts = () => {
  return Object.values(posts).map((post) => ({
    ...post,
    comments: Object.values(post.comments),
  }));
};
