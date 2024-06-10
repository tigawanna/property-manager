import type { ClientPluginFactory } from "rakkasjs/client";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ClientSuspense } from "rakkasjs";
import ReactQueryDevtoolsWrapper from "./devtools";

const tanstackQueryClientHooksFactory: ClientPluginFactory = (_, options) => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: async (data, variable, context, mutation) => {
        if (Array.isArray(mutation.meta?.invalidates)) {
          // biome-ignore lint/complexity/noForEach: <explanation>
          mutation.meta?.invalidates.forEach((key) => {
            return queryClient.invalidateQueries({
              queryKey: [key.trim()],
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

  function doSetQueryData(data: Record<string, unknown>) {
    for (const [key, value] of Object.entries(data)) {
      queryClient.setQueryData(JSON.parse(key), value, {
        updatedAt: Date.now(),
      });
    }
  }

  const tq = rakkas.tanstackQuery;

  // Insert data that was already streamed before this point
  doSetQueryData(tq.queryData ?? Object.create(null));
  // Delete the global variable so that it doesn't get serialized again
  // biome-ignore lint/performance/noDelete: <explanation>
    delete tq.queryData;
  // From now on, insert data directly
  tq.setQueryData = doSetQueryData;

  return {
    extendPageContext: {
      order: "pre",
      handler(ctx) {
        ctx.tanstackQueryClient = queryClient;
      },
    },

    wrapApp(app) {
      return (
        <QueryClientProvider client={queryClient}>
          {app}
          <ClientSuspense fallback={null}>
            <ReactQueryDevtoolsWrapper />
          </ClientSuspense>
        </QueryClientProvider>
      );
    },
  };
};

export default tanstackQueryClientHooksFactory;
