import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { uneval } from "devalue";
import type { ServerPluginFactory } from "rakkasjs/server";

const tanstackQueryServerHooksFactory: ServerPluginFactory = (_, options) => ({
  createPageHooks(requestContext) {
    let thereIsUnsentData = false;
    let unsentData = Object.create(null);

    const queryClient = new QueryClient({
      mutationCache: new MutationCache({
        onSuccess: async (data, variable, context, mutation) => {
          if (Array.isArray(mutation.meta?.invalidates)) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            mutation.meta?.invalidates.forEach((key) => {
              return queryClient.invalidateQueries({
                queryKey: key,
              });
            });
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 10,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
        ...options.defaultTanstackQueryOptions,
      },
    });
    queryClient.getQueryCache().subscribe(({ type, query }) => {
      if (type !== "updated" || query.state.status !== "success") return;
      unsentData[query.queryHash] = query.state.data;
      thereIsUnsentData = true;
    });

    return {
     async extendPageContext(pageContext) {
        pageContext.tanstackQueryClient = queryClient;
        // We'll read the session and CSRF token and put it
        // in the query client so that it can be used throughout
        // the app. `requestContext.fetch` doesn't do a network
        // roundtrip so it's cheap to use.
        // const [session, csrf] = await Promise.all([
        //   requestContext.fetch("/auth/session").then((r) => r.json()),
        //   requestContext.fetch("/auth/csrf").then((r) => r.json()),
        // ]);
        // console.log("session ============= ", session);
        // console.log("csrf ===============", csrf);
        // pageContext.tanstackQueryClient.setQueryData(["auth:session"], session);
        // pageContext.tanstackQueryClient.setQueryData(["auth:csrf"], csrf);
      },

      wrapApp(app) {
        return (
          <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
        );
      },

      emitToSyncHeadScript() {
        const serialized = uneval(unsentData);
        unsentData = Object.create(null);
        thereIsUnsentData = false;
        return `rakkas.tanstackQuery={queryData:${serialized},setQueryData:data=>Object.assign(rakkas.tanstackQuery.queryData,data)};`;
      },

      emitBeforeSsrChunk() {
        if (!thereIsUnsentData) return "";

        const serialized = uneval(unsentData);
        unsentData = Object.create(null);
        thereIsUnsentData = false;

        return `<script>rakkas.tanstackQuery.setQueryData(${serialized})</script>`;
      },
    };
  },
});

export default tanstackQueryServerHooksFactory;
