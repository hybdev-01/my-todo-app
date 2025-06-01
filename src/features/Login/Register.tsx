import { useContext, useState } from "react";
import { userSignUp } from "../../utils/login-api";
import LoginForm from "./LoginForm";
import { UserContext } from "../../store/UserContext";

export const Register = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const onClickHandler = async (data: Record<string, string>) => {
    try {
      const signUpUser = await userSignUp({
        firstName: data.firstName,
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", signUpUser.token);

      setUser(signUpUser);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <>
      {error && (
        <p
          style={{
            fontWeight: 500,
            color: "rgb(211, 3, 3)",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
      <LoginForm
        type="register"
        buttonLabel="Sign Up"
        onSubmitData={onClickHandler}
      />
    </>
  );
};
