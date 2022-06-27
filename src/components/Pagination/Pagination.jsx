import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, gamesCount, status }) => {
  const dispatch = useDispatch();
  const pageCount = Math.ceil(gamesCount / 20);
  const handlePageClick = (e) => {
    if (!e.nextSelectedPage) {
      return;
    }
    localStorage.setItem("page", e.nextSelectedPage + 1);
    dispatch(setCurrentPage(e.nextSelectedPage + 1));
  };

  return (
    <>
      <ReactPaginate
        initialPage={currentPage - 1}
        breakLabel="..."
        nextLabel=">"
        onClick={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={status === "ready" && pageCount < 500 ? pageCount : 500}
        previousLabel="<"
        renderOnZeroPageCount={null}
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
