declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        API: string;
        LINK:string;
        DB:string;
      }
    }
  }

  export {}
  