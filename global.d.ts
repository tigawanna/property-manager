import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "src/lib/pb/db-types";
import type { PocketBaseClient } from "@/lib/pb/client";

declare module "rakkasjs" {
  interface PageLocals {
    pb: PocketBaseClient
  }
  interface ServerSideLocals {
    pb: PocketBaseClient;
  }
}



declare global {
  type SSRFriendlyResponse<T=any> = {
    data: T|null;
    error: {
      name: string;
      message: string;
    }|null;
  };
}
