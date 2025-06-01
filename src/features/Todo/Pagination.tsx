import { useContext } from "react";
import styles from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
import TodoContext from "../../store/TodoContext";
import { PaginationContext } from "../../store/PaginationContext";

const Pagination = () => {
  const { page, limit, updatePage } = useContext(PaginationContext);
  const { totalQuantity } = useContext(TodoContext);

  const onChangePageHandler = (pageNumber: number) => {
    updatePage(pageNumber);
  };

  const totalPages = Math.ceil(totalQuantity / limit);
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={totalPages > 0 ? totalPages : 1}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      forcePage={page - 1}
      activeClassName={styles.selected}
      onPageChange={(e) => onChangePageHandler(e.selected + 1)}
    />
  );
};

export default Pagination;
