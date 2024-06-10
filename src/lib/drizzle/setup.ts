import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  //   url: process.env.DRIZZLE_TURSO_URL!,
  //   authToken: process.env.DRIZZLE_TURSO_TOKEN,
  url: "file:local-turso.db",
});

const db = drizzle(client);

// const result = await db.select().from(users).all();
