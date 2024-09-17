declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      FASTAPI_URL: string;
      API_URL: string;
    }
  }
}

export {};
