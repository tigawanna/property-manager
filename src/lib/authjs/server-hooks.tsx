import { uneval } from "devalue";
import type { ServerPluginFactory } from "rakkasjs/server";
import { Auth } from "@auth/core";
import type { Provider } from "@auth/core/providers";
import GitHubProvider from "@auth/core/providers/github";
import GoogleProvider from "@auth/core/providers/google";

const authjsServerHooksFactory: ServerPluginFactory = (_, options) => ({
  middleware: {
    beforePages: [
      async (ctx) => {
        // Only handle requests to /auth/*
        if (!ctx.url.pathname.match(/^\/auth(\/|$)/)) {
          return;
        }

        const {
          SERVER_SECRET,
          GITHUB_CLIENT_ID,
          GITHUB_CLIENT_SECRET,
          GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET,
        } = process.env;

        if (!SERVER_SECRET) {
          throw new Error(
            "SERVER_SECRET environment variable is not set. " +
              "You can generate one with 'npm run gen-secret' and put it in a .env file in the root of the project.",
          );
        }

        const providers: Provider[] = [];

        if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
          providers.push(
            GitHubProvider({
              clientId: GITHUB_CLIENT_ID,
              clientSecret: GITHUB_CLIENT_SECRET,
            }) as any,
          );
        } else {
          console.warn(
            "GitHub client ID and secret not set, GitHub login disabled",
          );
        }

        if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
          providers.push(
            GoogleProvider({
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
            }) as any,
          );
        } else {
          console.warn(
            "GOOGLE client ID and secret not set, GOOGLE login disabled",
          );
        }

        if (providers.length === 0) {
          throw new Error(
            "No authentication providers configured. " +
              "Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET and/or Google_CLIENT_ID and Google_CLIENT_SECRET. " +
              "You can put them in a .env file in the root of the project.",
          );
        }

        return Auth(
          new Request(ctx.url, {
            method: ctx.method,
            headers: ctx.request.headers,
            body: ctx.request.body,
            // @ts-expect-error: Node's fetch now requires this but types haven't been updated yet
            duplex: "half",
          }),
          {
            trustHost: true,
            secret: SERVER_SECRET,
            providers,
          },
        ) as Promise<Response>;
      },
    ],
  },
  createPageHooks(requestContext) {
    return {
      async extendPageContext(pageContext) {
        // We'll read the session and CSRF token and put it
        // in the query client so that it can be used throughout
        // the app. `requestContext.fetch` doesn't do a network
        // roundtrip so it's cheap to use.

        const [session, csrf] = await Promise.all([
          requestContext.fetch("/auth/session").then((r) => r.json()),
          requestContext.fetch("/auth/csrf").then((r) => r.json()),
        ]);
        // console.log("session ============= ", session);
        // console.log("csrf ===============", csrf);
        pageContext.tanstackQueryClient.setQueryData(["auth:session"], session);
        pageContext.tanstackQueryClient.setQueryData(["auth:csrf"], csrf);
      },
    };
  },
});

export default authjsServerHooksFactory;
