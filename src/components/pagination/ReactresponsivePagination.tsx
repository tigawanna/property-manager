import { useCustomSearchParams } from "@/utils/hooks/use-custom-search-params";
import { ClientSuspense } from "rakkasjs";
import ResponsivePagination from "react-responsive-pagination";

interface ListingsPaginationProps {
  query_key: string;
  total_pages: number;
}

export function ListPagination({ query_key,total_pages }: ListingsPaginationProps) {
  const { searchParam: page_param, updateSeachparams } = useCustomSearchParams(
    { key:query_key, defaultValue: "1" },
  );

  return (
    <div className="w-full  flex items-center justify-center">
      <ClientSuspense fallback={<div className="w-full h-5"></div>}>
        <ResponsivePagination
          current={parseInt(page_param??"1")}
          total={total_pages}
          onPageChange={(e) => {
            updateSeachparams(e.toString());
          }}
        />
      </ClientSuspense>
    </div>
  );
}
