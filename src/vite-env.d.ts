/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_URI: string
  readonly VITE_REACT_APP_API_PORT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}