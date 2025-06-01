import { useReducer, type ReactNode } from "react";
import { PaginationContext } from "./PaginationContext";

interface PaginationContextProviderProps {
  children: ReactNode;
}

type PaginationStateType = {
  page: number;
  limit: number;
};

const defaultPaginationState: PaginationStateType = {
  page: 1,
  limit: 8,
};

type ActionType = { type: string; payload: unknown };

const pgnReducer = (
  state: PaginationStateType,
  { type, payload }: ActionType
) => {
  if (type === "UPDATE_PAGE") {
    const newPageNumber = payload as number;

    return {
      ...state,
      page: newPageNumber,
    };
  }

  return defaultPaginationState;
};

const PaginationContextProvider = ({
  children,
}: PaginationContextProviderProps) => {
  const [pgnState, dispatchPgnAction] = useReducer(
    pgnReducer,
    defaultPaginationState
  );

  const updatePage = (page: number) => {
    dispatchPgnAction({ type: "UPDATE_PAGE", payload: page });
  };

  const pgnContextValue = {
    ...pgnState,
    updatePage,
  };

  return (
    <PaginationContext.Provider value={pgnContextValue}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContextProvider;
