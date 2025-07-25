/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_ABLY_API_KEY: string;
  // Agrega aquí otras variables de entorno si las necesitas
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
