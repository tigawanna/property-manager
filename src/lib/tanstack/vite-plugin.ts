import type { Plugin } from "vite";

export function rakkasTanstackQuery(): Plugin {
	return {
    name: "@rakkasjs/plugin-tanstack-query",

    api: {
      rakkas: {
        // Initial slash means it's in project root and not in node_modules
        clientHooks: "/src/lib/tanstack/client-hooks.tsx",
        serverHooks: "/src/lib/tanstack/server-hooks.tsx",
      },
    },
  };
}
