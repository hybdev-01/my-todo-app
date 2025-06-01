import { useContext, useState } from "react";
import EditButtonIcon from "../../assets/edit-button-icon.svg?react";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/UI/Modal";
import type { Todo } from "../../types/Todo";
import TodoForm from "./TodoForm";
import { editTodoAsync } from "../../utils/todos-api";
import TodoContext from "../../store/TodoContext";
import { UserContext } from "../../store/UserContext";

interface EditTodoProps {
  todoData: Pick<Todo, "id" | "text" | "deadline">;
}

export const EditTodo = ({ todoData }: EditTodoProps) => {
  const { user } = useContext(UserContext);
  const { editTodo } = useContext(TodoContext);
  const [isModalShow, setIsModalShow] = useState(false);

  const onHideModal = () => setIsModalShow(false);

  const onShowModal = () => setIsModalShow(true);

  const onEditTodoHandler = (data: Pick<Todo, "text" | "deadline">) => {
    if (
      data.text === todoData.text &&
      data.deadline.getTime() === todoData.deadline.getTime()
    ) {
      return;
    }
    const response = editTodoAsync(user.id, {
      id: todoData.id,
      text: data.text,
      deadline: data.deadline,
    });
    response.then((data) => data && editTodo(data));
  };

  return (
    <>
      {isModalShow && (
        <Modal title="Edit Todo" onModalClose={onHideModal}>
          <TodoForm
            buttonLabel="Edit Todo"
            defaultValue={todoData}
            onSubmitData={onEditTodoHandler}
            onClick={onHideModal}
          />
        </Modal>
      )}
      <Button emtpy onClick={onShowModal}>
        <EditButtonIcon />
      </Button>
    </>
  );
};
