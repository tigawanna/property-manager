import { defineConfig, loadEnv } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";
import { rakkasTanstackQuery } from "./src/lib/tanstack/vite-plugin";
import { rakkasAuthJS } from "./src/lib/authjs/vite-plugin";

const env = loadEnv("", process.cwd(), "");
Object.assign(process.env, env);

export default defineConfig({
  // ssr: {
  //   external: ["rakkasjs/node-adapter"],
  // },
  plugins: [
    tsconfigPaths(),
    react(),
    rakkas({
      adapter: "vercel",
    }),
    rakkasTanstackQuery(),
    rakkasAuthJS(),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
