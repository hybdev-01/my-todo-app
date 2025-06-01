import { Button } from "../../components/UI/Button";
import DeleteButtonIcon from "../../assets/delete-button-icon.svg?react";
import { deleteTodoAsync } from "../../utils/todos-api";
import { useContext } from "react";
import TodoContext from "../../store/TodoContext";
import { UserContext } from "../../store/UserContext";

interface DeleteTodoProps {
  id: string;
}

export const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const { user } = useContext(UserContext);
  const { deleteTodo } = useContext(TodoContext);

  const onDeleteHandler = () => {
    const response = deleteTodoAsync(user.id, id);
    response.then((res) => res && deleteTodo(id));
  };

  return (
    <Button emtpy onClick={onDeleteHandler}>
      <DeleteButtonIcon />
    </Button>
  );
};
