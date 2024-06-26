import { PageContext } from "rakkasjs";

export async function artificialDelay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export interface ErrorNotData {
  error: {
    message: any;
    original_error: any;
  };
}

export type DataOrError<T> = T | ErrorNotData;

export function narrowOutError<T = unknown>(data?: DataOrError<T>) {
  // @ts-expect-error
  if (data && !("error" in data)) {
    return data;
  }
}

export async function tryCatchWrapper<T, E extends Error>(
  fn: Promise<T>,
): Promise<{ data: T | null; error: E | null }> {
  try {
    const data = await fn;
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error?.message ?? "something went wrong fetching data",
    };
  }
}
