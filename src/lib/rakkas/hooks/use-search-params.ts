import { useLocation } from "rakkasjs";

export function useSearchParams({
  key,
  default_value,
}: {
  key: string;
  default_value: string;
}) {
  const { current } = useLocation();
return current.searchParams.get(key)??default_value
}
