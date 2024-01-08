/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POSTS_URL: string;
  readonly VITE_COMMENTS_URL: string;
  readonly VITE_QUERY_URL: string;
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
