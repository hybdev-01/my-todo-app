import { type AxiosRequestConfig } from "axios";
import type { Todo } from "../types/Todo";
import { appAPI } from "../config";

export const getAllTodosAsync = async (
  userId: number,
  params?: AxiosRequestConfig
): Promise<Todo[]> => {
  try {
    const response = await appAPI.get(`/users/${userId}/todos`, {
      params,
    });
    if (response.status === 200) return response.data;
    else throw new Error(`Failed to get todos ${response.data}`);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    return [];
  }
};

export const addTodoAsync = async (
  userId: number,
  Todo: Pick<Todo, "text" | "deadline">
): Promise<Todo | false> => {
  try {
    const response = await appAPI.post(`/users/${userId}/todos`, {
      id: Math.random(),
      text: Todo.text,
      completed: false,
      deadline: Todo.deadline,
      userId,
    });

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return false;
  }
};

export const checkTodoAsync = async (
  userId: number,
  Todo: Pick<Todo, "id" | "completed">
) => {
  try {
    const response = await appAPI.put(`/users/${userId}/todos/${Todo.id}`, {
      completed: !Todo.completed,
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return false;
  }
};

export const editTodoAsync = async (
  userId: number,
  Todo: Pick<Todo, "id" | "text" | "deadline">
): Promise<Todo | false> => {
  try {
    const response = await appAPI.put(`/users/${userId}/todos/${Todo.id}`, {
      text: Todo.text,
      deadline: Todo.deadline,
      completed: false,
    });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return false;
  }
};

export const deleteTodoAsync = async (userId: number, todoId: string) => {
  try {
    const response = await appAPI.delete(`/users/${userId}/todos/${todoId}`);

    return response.status === 200 && true;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return false;
  }
};

export const getFilteredTodos = async (
  userId: number,
  filter: string,
  pagination: { page: number; limit: number }
) => {
  const requestParams: Record<string, unknown> = {};

  switch (filter) {
    case "completed":
      requestParams.completed = true;
      break;
    case "inProgress":
    case "expired":
      requestParams.completed = false;
      break;
  }

  const currentPageTodos = { ...requestParams, ...pagination } as Record<
    string,
    unknown
  >;

  if (filter === "inProgress" || filter === "expired") {
    const deleteKey = Object.keys(pagination);
    deleteKey.forEach((key) => delete currentPageTodos[key]);
  }

  try {
    const filteredTodos = await Promise.all([
      getAllTodosAsync(userId, currentPageTodos),
      getAllTodosAsync(userId, requestParams),
    ]);
    return filteredTodos;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    return [];
  }
};
