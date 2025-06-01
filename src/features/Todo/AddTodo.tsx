import { useContext, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/UI/Modal";
import type { Todo } from "../../types/Todo";
import { addTodoAsync } from "../../utils/todos-api";
import TodoContext from "../../store/TodoContext";
import TodoForm from "./TodoForm";
import { PaginationContext } from "../../store/PaginationContext";
import { UserContext } from "../../store/UserContext";

interface AddTodoProps {
  filter: string;
}

export const AddTodo = ({ filter }: AddTodoProps) => {
  const { user } = useContext(UserContext);
  const { limit } = useContext(PaginationContext);
  const { addTodo } = useContext(TodoContext);
  const [isModalShow, setIsModalShow] = useState(false);

  const onHideModal = () => setIsModalShow(false);

  const onShowModal = () => setIsModalShow(true);

  const onAddTodoHandler = (data: Pick<Todo, "text" | "deadline">) => {
    const res = addTodoAsync(user.id, data);
    res.then((todo) => todo && addTodo([todo, limit]));
  };

  return (
    <>
      {isModalShow && (
        <Modal title="New Todo" onModalClose={onHideModal}>
          <TodoForm
            buttonLabel="Add Todo"
            onSubmitData={onAddTodoHandler}
            onClick={onHideModal}
          />
        </Modal>
      )}
      {filter === "all" && <Button onClick={onShowModal}>Add New Todo</Button>}
    </>
  );
};
