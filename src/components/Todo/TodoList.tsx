import { memo, useContext, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";
import TodoContext from "../../store/TodoContext";
import { PaginationContext } from "../../store/PaginationContext";

let pageOrder = 0;

export const TodoList = memo(() => {
  const { todos, totalQuantity, actionType } = useContext(TodoContext);
  const { page, limit, updatePage } = useContext(PaginationContext);

  console.log("all todos =", todos);
  console.log("total qty =", totalQuantity);
  console.log("current page =", page);
  console.log("actionType = ", actionType);

  useEffect(() => {
    if (actionType === "DELETED_LAST_TODO") {
      console.log("action type =", actionType);
      updatePage(page > 1 ? page - 1 : 1);
    }

    if (actionType === "ADD_LIMITED_TODO") {
      const totalPages = Math.ceil(totalQuantity / limit);
      updatePage(totalPages);
    }
  }, [actionType]);

  useEffect(() => {
    pageOrder = (page - 1) * limit;
  }, [page, limit]);

  return (
    <section className={styles["todos-wrapper"]}>
      <ul className={styles["top-labels"]}>
        <li>№</li>
        <li>Task</li>
        <li>Status</li>
        <li>Deadline</li>
        <li>Actions</li>
      </ul>
      <ul className={styles["todo-list"]}>
        {todos.map((todo, idx) => (
          <TodoItem key={todo.id} order={idx + 1 + pageOrder} {...todo} />
        ))}
      </ul>
    </section>
  );
});
