import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import type { Session } from "@auth/core/types";
import { usePageContext, useRequestContext } from "rakkasjs";

export function useAuthSession(options?: UseSuspenseQueryOptions) {
  const ctx = usePageContext();
  return useSuspenseQuery({
    queryKey: ["auth:session"],
    queryFn: async () => {
      return ctx?.fetch("/auth/session").then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }
        const data = r.json() as Promise<Session>;
        // console.log(" =========== useAuthSession =========== ", data);
        return data;
      });
    },
    staleTime: 1000 * 10,
    ...options,
  });
}

export function useCsrf(options?: UseSuspenseQueryOptions) {
  const ctx = useRequestContext();
  return useSuspenseQuery({
    queryKey: ["auth:csrf"],
    queryFn: async () => {
      return ctx?.fetch("/auth/csrf").then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }
        const data = r.json() as Promise<string>;
        // console.log(" =========== useCsrf =========== ", data);
        return data;
      });
    },
    staleTime: 1000 * 10,
    ...options,
  });
}
