import type { RequestContext } from "rakkasjs";
import { useRequestContext } from "rakkasjs";
import { useState, useSyncExternalStore } from "react";

export function useSSRFriendlyTheme() {
  const ctx = useRequestContext();
  const [theme, setTheme] = useState(() => getSSRFriendlyTheme(ctx));
  const updateTheme = (newTheme: string) => {
    if (typeof window !== "undefined") {
      setTheme(newTheme);
      document?.documentElement?.setAttribute("data-theme", newTheme);
      document.cookie = `theme=${newTheme}`;
    }
  };
  return { theme, updateTheme };
}

const emptySubscribe = () => () => {};

export function useWindowTheme() {
  // const [theme,setTheme] = useState(() => window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const theme = useSyncExternalStore(
    emptySubscribe,
    () =>
      (document.documentElement.getAttribute("data-theme") ?? "light") as
        | "light"
        | "dark",
    () => "light",
  );

  return theme;
}

export function getSSRFriendlyTheme(ctx: RequestContext<unknown> | undefined) {
  if (ctx?.cookie?.theme) {
    const server_side_cookie = ctx.cookie.theme;
    return server_side_cookie;
  }
  if (typeof window !== "undefined") {
    const client_side_data_theme =
      document.documentElement.getAttribute("data-theme");

    return client_side_data_theme ?? "light";
  }

  return "light";
}
