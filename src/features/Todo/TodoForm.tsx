import { Button } from "../../components/UI/Button";
import type { Todo } from "../../types/Todo";
import styles from "./TodoForm.module.css";
import { useEffect, useRef, useState } from "react";

interface TodoFormProps {
  buttonLabel: string;
  defaultValue?: Pick<Todo, "text" | "deadline">;
  onSubmitData: (data: Pick<Todo, "text" | "deadline">) => void;
  onClick: () => void;
}

export const TodoForm = ({
  buttonLabel,
  defaultValue,
  onSubmitData,
  onClick,
}: TodoFormProps) => {
  const textInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);

  const [textInputMessage, setTextInputMessage] = useState("");
  const [dateInputMessage, setDateInputMessage] = useState("");

  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && textInputMessage.length)
      setTextInputMessage("");
  };

  const onChangeDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && dateInputMessage.length)
      setDateInputMessage("");
  };

  const today = new Date();

  const onSumbitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textInput.current?.value.trim())
      setTextInputMessage("This field is required");

    if (!dateInput.current?.value.trim())
      setDateInputMessage("This field is required");

    const selectedDate = dateInput.current?.valueAsDate;
    selectedDate?.setHours(0, 0, 0, 0);

    // const GMTHour = dateInput.current?.valueAsDate?.getHours() as number;
    today.setHours(0, 0, 0, 0);

    if (selectedDate && selectedDate.getTime() < today.getTime())
      setDateInputMessage(
        `The date value must be ${today.toLocaleDateString("ru-KZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} or later`
      );

    if (
      !textInput.current?.value.trim() ||
      !dateInput.current?.value.trim() ||
      !selectedDate ||
      selectedDate.getTime() < today.getTime()
    )
      return;

    const deadlineDate =
      (selectedDate.getTime() === today.getTime() &&
        selectedDate.setTime(Date.now())) ||
      selectedDate.getTime();

    onSubmitData({
      text: textInput.current.value,
      deadline: new Date(deadlineDate),
    });

    onClick();
  };

  useEffect(() => {
    if (textInput.current) textInput.current.focus();
  }, []);

  return (
    <form className={styles.form} onSubmit={onSumbitFormHandler}>
      <label htmlFor="todo-text">Text:</label>
      <input
        defaultValue={defaultValue?.text}
        ref={textInput}
        type="text"
        id="todo-text"
        autoComplete="off"
        placeholder="Enter your task..."
        onChange={onChangeTextInput}
      />
      {textInputMessage && <p className={styles.warn}>{textInputMessage}</p>}
      <label htmlFor="todo-date">Deadline:</label>
      <input
        ref={dateInput}
        defaultValue={defaultValue?.deadline.toISOString().split("T")[0]}
        type="date"
        id="todo-date"
        placeholder="Choose deadline date..."
        min={today.toISOString().split("T")[0]}
        onChange={onChangeDateInput}
      />
      {dateInputMessage && <p className={styles.warn}>{dateInputMessage}</p>}
      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
};

export default TodoForm;
