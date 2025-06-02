import styles from "./FilterTodo.module.css";
import type { TodoStatus } from "../../types/TodoStatus";
import ArrowRightIcon from "../../assets/right-arrow-icon.svg?react";
import { useContext, useEffect, useState } from "react";
import { getFilteredTodos } from "../../utils/todos-api";
import TodoContext from "../../store/TodoContext";
import { PaginationContext } from "../../store/PaginationContext";
import { UserContext } from "../../store/UserContext";
import type { Todo } from "../../types/Todo";

const todoFilterStatuses: Record<string, TodoStatus> = {
  all: "All",
  completed: "Completed",
  expired: "Expired",
  inProgress: "In Progress",
};

interface FilterTodoProps {
  onSelectFilterHandler: (filter: string) => void;
}

export const FilterTodo = ({ onSelectFilterHandler }: FilterTodoProps) => {
  const { user } = useContext(UserContext);
  const { getAllTodos, actionType, totalQuantity } = useContext(TodoContext);
  const { page, limit, updatePage } = useContext(PaginationContext);
  const [selectFilterValue, setSelectFilterValue] = useState("all");

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilterValue(e.target.value);
    updatePage(1);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (actionType === "DELETE_TODO" && totalQuantity + 1 > page * limit) {
      getFilteredTodos(user.id, selectFilterValue, { page, limit })
        .then((todos) =>
          currentFilterTodos(todos, selectFilterValue, today, { page, limit })
        )
        .then(([filteredTodo, allTodos]) =>
          getAllTodos([filteredTodo, allTodos.length])
        );
    }
  }, [totalQuantity]);

  useEffect(() => {
    onSelectFilterHandler(selectFilterValue);

    getFilteredTodos(user.id, selectFilterValue, { page, limit })
      .then((todos) =>
        currentFilterTodos(todos, selectFilterValue, today, { page, limit })
      )
      .then(([filteredTodo, allTodos]) =>
        getAllTodos([filteredTodo, allTodos.length])
      );
  }, [selectFilterValue, page, limit]);

  return (
    <div className={styles["filter-status"]}>
      <select
        name="todo-status"
        id={`${styles["status-filter"]}`}
        value={selectFilterValue}
        onChange={onChangeHandler}
      >
        {Object.entries(todoFilterStatuses).map(([objKey, objValue], idx) => (
          <option key={idx} value={objKey} defaultChecked={idx === 0 && true}>
            {objValue}
          </option>
        ))}
      </select>
      <div className={styles["custom-arrow"]}>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

const currentFilterTodos = (
  todos: Todo[][],
  currentFilter: string,
  today: Date,
  { page, limit }: { page: number; limit: number }
) => {
  switch (currentFilter) {
    case "inProgress":
      return todos.map(
        (arr, idx) =>
          (idx === 0 &&
            arr
              .filter(
                (todo) => new Date(todo.deadline).getTime() >= today.getTime()
              )
              .slice((page - 1) * limit, page * limit)) ||
          arr.filter(
            (todo) => new Date(todo.deadline).getTime() >= today.getTime()
          )
      );
    case "expired":
      return todos.map(
        (arr, idx) =>
          (idx === 0 &&
            arr
              .filter(
                (todo) => new Date(todo.deadline).getTime() < today.getTime()
              )
              .slice((page - 1) * limit, page * limit)) ||
          arr.filter(
            (todo) => new Date(todo.deadline).getTime() < today.getTime()
          )
      );
    default:
      return todos;
  }
};
