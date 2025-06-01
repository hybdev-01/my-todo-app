import type { TodoStatus } from "../../types/TodoStatus";
import type { Todo } from "../../types/Todo";
import styles from "./TodoItem.module.css";
import { memo, useContext } from "react";
import { checkTodoAsync } from "../../utils/todos-api";
import { DeleteTodo } from "../../features/Todo/DeleteTodo";
import { EditTodo } from "../../features/Todo/EditTodo";
import TodoContext from "../../store/TodoContext";
import { UserContext } from "../../store/UserContext";

interface TodoItemProps extends Todo {
  order: number;
}

export const TodoItem = memo(
  ({ id, order, text, completed, deadline }: TodoItemProps) => {
    const { user } = useContext(UserContext);
    const { toggleCheckTodo } = useContext(TodoContext);

    const deadlineFormattedDate = new Date(deadline).toLocaleDateString(
      "ru-KZ",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    const currentStatus: TodoStatus = completed
      ? "Completed"
      : !completed && new Date(deadline).getTime() <= Date.now()
      ? "Expired"
      : "In Progress";

    const onCheckTodo = () => {
      checkTodoAsync(user.id, { id, completed });
      toggleCheckTodo(id);
    };

    return (
      <li className={styles["todo-item"]}>
        <p>{order}</p>
        <div>
          <input
            className={styles["item-input"]}
            name="check-todo"
            id={`todo-task-${id}`}
            type="checkbox"
            onChange={onCheckTodo}
            checked={completed}
          />
          <label htmlFor={`todo-task-${id}`}>{text}</label>
        </div>
        <p
          className={
            styles[
              `status-${
                currentStatus === "In Progress"
                  ? "inProgress"
                  : currentStatus.toLowerCase()
              }`
            ]
          }
        >
          {currentStatus}
        </p>
        <p>{deadlineFormattedDate}</p>
        <div className={styles.actions}>
          <EditTodo todoData={{ id, text, deadline: new Date(deadline) }} />
          <DeleteTodo id={id} />
        </div>
      </li>
    );
  }
);
