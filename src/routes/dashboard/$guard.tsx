import type { Session } from "@auth/core/types";
import type { LookupHookResult, PageRouteGuardContext } from "rakkasjs";

export function pageGuard(ctx: PageRouteGuardContext): LookupHookResult {
  const session = ctx.tanstackQueryClient.getQueryData<Session | null>([
    "auth:session",
  ]);
  console.log("============ dashboard guard session ===========", session);
  if (session?.user) {
    return true;
  }
  const url = new URL("/auth/signin", ctx.url);
  url.searchParams.set("callbackUrl", url.pathname + url.search);
  return { redirect: url };
}
