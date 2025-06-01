import { useContext, useState } from "react";
import { userAuth } from "../../utils/login-api";
import LoginForm from "./LoginForm";
import { UserContext } from "../../store/UserContext";

export const Auth = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const onClickHandler = async (data: Record<string, string>) => {
    try {
      const authUser = await userAuth({
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", authUser.token);

      setUser(authUser);
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
        type="login"
        buttonLabel="Sign In"
        onSubmitData={onClickHandler}
      />
    </>
  );
};
