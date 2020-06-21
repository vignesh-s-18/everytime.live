/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_SOCKETIO_SERVER: string
    REACT_APP_GA_TRACKING_CODE: string
  }
}
