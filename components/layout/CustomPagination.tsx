"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "react-js-pagination";

interface CustomPaginationProps {
  resPerPage: number;
  filteredRoomsCount: number;
}

const CustomPagination = ({
  resPerPage,
  filteredRoomsCount,
}: CustomPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;
  const onPageChange = (currentPage: string) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }
      router.push(`${window.location.pathname}?${queryParams.toString()}`);
    }
  };

  return (
    <div>
      {resPerPage < filteredRoomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            pageRangeDisplayed={5}
            onChange={onPageChange}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
