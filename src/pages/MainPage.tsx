import Layout from "../components/Layout/Layout";
import { TodoActions } from "../components/Todo/TodoActions";
import { TodoList } from "../components/Todo/TodoList";
import Pagination from "../features/Todo/Pagination";
import PaginationContextProvider from "../store/PaginationContextProvider";
import TodoContextProvider from "../store/TodoContextProvider";

const MainPage = () => {
  return (
    <TodoContextProvider>
      <PaginationContextProvider>
        <Layout>
          <TodoActions />
          <TodoList />
          <Pagination />
        </Layout>
      </PaginationContextProvider>
    </TodoContextProvider>
  );
};

export default MainPage;
