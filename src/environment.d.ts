declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BCRYPT_SALT: string;
      DATABASE_URL: string;
      PORT: string;
    }
  }
}

export {};
