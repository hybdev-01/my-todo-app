import { createContext } from "react";

import type { Todo } from "../types/Todo";

interface ITodoContext {
  todos: Todo[];
  totalQuantity: number;
  actionType: string;
  getAllTodos: (todos: [Todo[], number]) => void;
  addTodo: (todo: [Todo, number]) => void;
  toggleCheckTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<ITodoContext>({
  todos: [],
  totalQuantity: 0,
  actionType: "",
  getAllTodos: () => {},
  addTodo: () => {},
  toggleCheckTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

export default TodoContext;
