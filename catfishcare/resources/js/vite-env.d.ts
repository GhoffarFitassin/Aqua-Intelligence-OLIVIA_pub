declare module "*.css";
declare module "papaparse";

interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob: (typeof import("vite").ImportMeta)["glob"];
}
