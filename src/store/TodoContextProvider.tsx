import { useReducer, type ReactNode } from "react";
import type { Todo } from "../types/Todo";
import TodoContext from "./TodoContext";

interface TodoContextProviderProps {
  children: ReactNode;
}

type TodoStateType = {
  todos: Todo[];
  actionType: string;
  totalQuantity: number;
};

const defaultTodoState: TodoStateType = {
  todos: [],
  actionType: "",
  totalQuantity: 0,
};

type ActionType = { type: string; payload: unknown };

const todoReducer = (state: TodoStateType, { type, payload }: ActionType) => {
  if (type === "GET_TODOS") {
    const [allCurrentTodos, totalQtyTodos] = (Array.isArray(payload) &&
      (payload as [Todo[], number])) || [[], 0];

    return {
      ...state,
      todos: allCurrentTodos,
      totalQuantity: totalQtyTodos,
    };
  }

  if (type === "ADD_TODO") {
    const [newTodo, limit] = (Array.isArray(payload) && payload) || [];
    if (state.todos.length < limit) {
      state.todos.push(newTodo);

      return {
        ...state,
        todos: [...state.todos],
        totalQuantity: state.totalQuantity + 1,
        actionType: "",
      };
    }

    return {
      ...state,
      totalQuantity: state.totalQuantity + 1,
      actionType: "ADD_LIMITED_TODO",
    };
  }

  if (type === "TOGGLE_CHECK_TODO") {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      ),
    };
  }

  if (type === "EDIT_TODO") {
    const editTodo = payload as Todo;
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === editTodo.id ? editTodo : todo
      ),
    };
  }

  if (type === "DELETE_TODO") {
    const todos = state.todos.filter((todo) => todo.id !== payload);

    if (todos.length !== 0) {
      return {
        ...state,
        todos: todos,
        totalQuantity: state.totalQuantity - 1,
        actionType: "",
      };
    }

    return {
      ...state,
      todos: todos,
      totalQuantity: state.totalQuantity - 1,
      actionType: "DELETED_LAST_TODO",
    };
  }

  return defaultTodoState;
};

const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todoState, dispatchTodosAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const getAllTodos = (todos: [Todo[], number]) => {
    dispatchTodosAction({ type: "GET_TODOS", payload: todos });
  };

  const addTodo = (todo: [Todo, number]) => {
    dispatchTodosAction({ type: "ADD_TODO", payload: todo });
  };

  const toggleCheckTodo = (id: string) => {
    dispatchTodosAction({ type: "TOGGLE_CHECK_TODO", payload: id });
  };

  const editTodo = (todo: Todo) => {
    dispatchTodosAction({ type: "EDIT_TODO", payload: todo });
  };

  const deleteTodo = (id: string) => {
    dispatchTodosAction({ type: "DELETE_TODO", payload: id });
  };

  const todoContextValue = {
    ...todoState,
    getAllTodos,
    addTodo,
    toggleCheckTodo,
    editTodo,
    deleteTodo,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
