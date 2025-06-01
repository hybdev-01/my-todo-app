import { createContext } from "react";

interface IPaginationContext {
  page: number;
  limit: number;
  updatePage: (page: number) => void;
}

export const PaginationContext = createContext<IPaginationContext>({
  page: 0,
  limit: 0,
  updatePage: () => {},
});
