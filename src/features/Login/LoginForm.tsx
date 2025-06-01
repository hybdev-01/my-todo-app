import { useRef, useState, type FormEvent } from "react";
import { Button } from "../../components/UI/Button";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  type: "login" | "register";
  buttonLabel: string;
  onSubmitData: (data: { [key: string]: string }) => void;
}

export const LoginForm = ({
  type,
  buttonLabel,
  onSubmitData,
}: LoginFormProps) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const loginInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [nameInputWarn, setNameInputWarn] = useState("");
  const [loginInputWarn, setLoginInputWarn] = useState("");
  const [passwordInputWarn, setPasswordInputWarn] = useState("");

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputState: { inputString: string; inputFunc: (txt: string) => void }
  ) => {
    const { inputString, inputFunc } = inputState;

    if (e.currentTarget.value && inputString.length) inputFunc("");
  };

  const onSumbitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "register" && !nameInput.current?.value.trim())
      setNameInputWarn("This field is not be empty");

    if (!loginInput.current?.value.trim())
      setLoginInputWarn("This field is not be empty");

    if (!passwordInput.current?.value.trim())
      setPasswordInputWarn("This field is not be empty");

    if (loginInput.current?.value && loginInput.current.value.trim().length < 4)
      setLoginInputWarn("The login must be include 4 characters or more");

    if (
      passwordInput.current?.value &&
      passwordInput.current.value.trim().length < 6
    )
      setPasswordInputWarn("The password must be include 6 characters or more");

    if (
      (type === "register" && !nameInput.current?.value.trim()) ||
      !loginInput.current?.value.trim() ||
      !passwordInput.current?.value.trim() ||
      loginInput.current.value.trim().length < 4 ||
      passwordInput.current.value.trim().length < 6
    )
      return;

    const formData = {
      username: loginInput.current?.value,
      password: passwordInput.current?.value,
      firstName: "",
    };

    if (type === "register")
      formData.firstName = nameInput.current?.value || "";

    onSubmitData(formData);
    e.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={onSumbitFormHandler}>
      {type === "register" && (
        <>
          <label htmlFor="name">Name</label>
          <input
            ref={nameInput}
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Enter first name"
            onChange={(e) =>
              onChangeInput(e, {
                inputString: nameInputWarn,
                inputFunc: setNameInputWarn,
              })
            }
          />
          {nameInputWarn && <p className={styles.warn}>{nameInputWarn}</p>}
        </>
      )}
      <label htmlFor="login">Login</label>
      <input
        ref={loginInput}
        type="text"
        id="login"
        autoComplete="off"
        placeholder="Enter username"
        onChange={(e) =>
          onChangeInput(e, {
            inputString: loginInputWarn,
            inputFunc: setLoginInputWarn,
          })
        }
      />
      {loginInputWarn && <p className={styles.warn}>{loginInputWarn}</p>}

      <label htmlFor="password">Password</label>
      <input
        ref={passwordInput}
        type="password"
        id="password"
        autoComplete="off"
        placeholder="Enter password"
        onChange={(e) =>
          onChangeInput(e, {
            inputString: passwordInputWarn,
            inputFunc: setPasswordInputWarn,
          })
        }
      />
      {passwordInputWarn && <p className={styles.warn}>{passwordInputWarn}</p>}
      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
};

export default LoginForm;
