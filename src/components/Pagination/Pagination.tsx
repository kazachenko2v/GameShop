import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";
import { PaginationProps } from "../types";

import styles from "./Pagination.module.css";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  gamesCount,
  isSuccess,
}) => {
  const dispatch = useDispatch();
  const pageCount = Math.ceil(gamesCount / 20);
  const handlePageClick = (event: React.MouseEvent & { selected: number }) => {
    localStorage.setItem("page", JSON.stringify(event.selected + 1));
    dispatch(setCurrentPage(event.selected + 1));
  };

  return (
    <>
      <ReactPaginate
        initialPage={currentPage - 1}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={isSuccess && pageCount < 500 ? pageCount : 500}
        previousLabel="<"
        containerClassName={styles.pagination_container}
        pageClassName={styles.page_link_container}
        previousClassName={styles.page_link_container}
        previousLinkClassName={styles.page_link}
        nextClassName={styles.page_link_container}
        nextLinkClassName={styles.page_link}
        pageLinkClassName={styles.page_link}
        activeClassName={styles.page_link__active}
        breakClassName={styles.page_link_container}
        breakLinkClassName={styles.page_link}
      />
    </>
  );
};

export default Pagination;
