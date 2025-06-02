import styles from "./TodoActions.module.css";

import { AddTodo } from "../../features/Todo/AddTodo";
import { FilterTodo } from "../../features/Todo/FilterTodo";
import { useState } from "react";

export const TodoActions = () => {
  const [currentFilter, setCurrentFilter] = useState("");

  return (
    <div className={styles["todo-actions-wrapper"]}>
      <AddTodo filter={currentFilter} />
      <FilterTodo
        onSelectFilterHandler={(filter) => setCurrentFilter(filter)}
      />
    </div>
  );
};
