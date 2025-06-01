import styles from "./FilterTodo.module.css";
import type { TodoStatus } from "../../types/TodoStatus";
import ArrowRightIcon from "../../assets/right-arrow-icon.svg?react";
import { useContext, useEffect, useState } from "react";
import { getFilteredTodos } from "../../utils/todos-api";
import TodoContext from "../../store/TodoContext";
import { PaginationContext } from "../../store/PaginationContext";
import { UserContext } from "../../store/UserContext";

const todoFilterStatuses: Record<string, TodoStatus> = {
  all: "All",
  completed: "Completed",
  expired: "Expired",
  inProgress: "In Progress",
};

interface FilterTodoProps {
  onCurrentFilter: (filter: string) => void;
}

export const FilterTodo = ({ onCurrentFilter }: FilterTodoProps) => {
  const { user } = useContext(UserContext);
  const { getAllTodos } = useContext(TodoContext);
  const { page, limit, updatePage } = useContext(PaginationContext);
  const [selectFilterValue, setSelectFilterValue] = useState("all");

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilterValue(e.target.value);
    updatePage(1);
  };

  useEffect(() => {
    onCurrentFilter(selectFilterValue);

    getFilteredTodos(user.id, selectFilterValue, { page, limit })
      .then((todos) => {
        switch (selectFilterValue) {
          case "inProgress":
            return todos.map((arr) =>
              arr.filter(
                (todo) => new Date(todo.deadline).getTime() >= Date.now()
              )
            );
          case "expired":
            return todos.map((arr) =>
              arr.filter(
                (todo) => new Date(todo.deadline).getTime() < Date.now()
              )
            );
          default:
            return todos;
        }
      })
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
