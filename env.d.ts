
// Fix: Removed the explicit 'process' declaration to resolve conflict with existing global types.
// The environment already provides 'process.env' with an index signature.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
