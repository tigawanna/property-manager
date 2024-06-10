import type { Plugin } from "vite";

export function rakkasAuthJS(): Plugin {
  return {
    name: "@rakkasjs/plugin-authjs",

    api: {
      rakkas: {
        // Initial slash means it's in project root and not in node_modules

        serverHooks: "/src/lib/authjs/server-hooks.tsx",
      },
    },
  };
}
