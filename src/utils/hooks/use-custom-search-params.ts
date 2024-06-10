import { navigate, useLocation } from "rakkasjs";

interface UseCustomSearchParams {
  key: string;
  defaultValue?: string;
}
export function useCustomSearchParams({
  key,
  defaultValue = "q",
}: UseCustomSearchParams) {
  const { current } = useLocation();
  const searchParam = current.searchParams.get(key) ?? defaultValue;
  function updateSeachparams(value?: string) {
    const new_url = new URL(current);
    if (!value) {
      new_url.searchParams.delete(key);
    } else {
      new_url.searchParams.set(key, value);
    }

    navigate(new_url.toString(), { replace: true }) ?? defaultValue;
  }
  return { searchParam, updateSeachparams };
}
