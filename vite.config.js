import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { env } from "node:process";

const repositoryName = env.GITHUB_REPOSITORY?.split("/")[1];
const pagesBase =
  repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}/`
    : "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  base: pagesBase,
});
