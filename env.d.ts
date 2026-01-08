
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
    readonly [key: string]: string | undefined;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
