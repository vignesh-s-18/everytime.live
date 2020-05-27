declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SOCKETIO_URL: string;
    }
  }
}

export {};