import type { ZodError } from "zod";

export function mapZodIssueToField(error: ZodError, field: string) {
  return error.issues.find((issue) => issue?.path[0] === field)?.message;
}
