declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      POSTS_URL: string
      COMMENTS_URL: string
      QUERY_SERVICE_URL: string
      EVENT_BUS_URL: string
    }
  }
}

// dummy export to make typescript happy
// need an import or export for it to be a module
export {}