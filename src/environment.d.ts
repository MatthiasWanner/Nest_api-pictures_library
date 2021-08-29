declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BCRYPT_SALT: string;
    }
  }
}

export {};
