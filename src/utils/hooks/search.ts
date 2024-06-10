import { useEffect, useState, useTransition } from "react";
import { useDebouncedValue } from "./use-debounces";
import { navigate, useLocation } from "rakkasjs";

interface UseSearchWithQuery {
  query_prefix: string;
  search_query?: boolean;
  default_value?: string;
}
export function useSearchWithQuery(
  opts: UseSearchWithQuery = {
    query_prefix: "q",
    search_query: true,
  },
) {
  const { current } = useLocation();
  const [_, startTransition] = useTransition();
  const url = current;
  const [keyword, setKeyword] = useState(
    url?.searchParams?.get(opts.query_prefix) ?? opts.default_value ?? "",
  );
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  useEffect(() => {
    if (current && debouncedValue) {
      startTransition(() => {
        url?.searchParams?.set(opts.query_prefix, debouncedValue);
        navigate(url);
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}

interface UseDebouncedSearchWithhParams<SQ extends string, ST extends string> {
  default_search_query?: SQ;
  default_search_type?: ST;
}

export function useDebouncedSearchWithhParams<
  SQ extends string,
  ST extends string,
>({
  default_search_query,
  default_search_type,
}: UseDebouncedSearchWithhParams<SQ, ST>) {
  const { current } = useLocation();
  const initSearchType = current.searchParams.get("st") as ST | null;
  const initSearchValue = current.searchParams.get("sq") ?? "";
  const defaultSearchType = initSearchType ?? default_search_type;
  const [, startTransition] = useTransition();
    const [keyword, setKeyword] = useState(
      initSearchValue ??"",
    );
  const { debouncedValue, setDebouncedValue, isDebouncing} = useDebouncedValue(
    keyword,
    3000,
  );


  const [searchType, setSearchType] = useState<ST | undefined>(
    defaultSearchType,
  );
  useEffect(() => {
    if (debouncedValue !== initSearchValue) {
      setDebouncedValue(initSearchValue);
    }
  }, []);

  useEffect(() => {
    const new_url = new URL(current);
    if (!debouncedValue || debouncedValue === "") {
      new_url.searchParams.delete("sq");
    }
    if (debouncedValue && debouncedValue !== initSearchValue) {
      new_url.searchParams.set("sq", debouncedValue);
    }
    if (searchType && searchType !== initSearchType) {
      new_url.searchParams.set("st", searchType);
    }
    const new_url_string = new_url.toString();
    if (new_url_string !== current.toString()) {
      startTransition(() => {
        navigate(new_url_string);
      });
    }
    // startTransition(() => {
    //   navigate(new_url.toString());
    // });
  }, [debouncedValue, searchType]);

  return {
    debouncedValue,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    current,
    keyword,
    setKeyword
 
  };
}
