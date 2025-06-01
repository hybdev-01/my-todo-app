import { useState } from "react";
import { Button } from "../UI/Button";
import styles from "./LoginActions.module.css";
import { Auth } from "../../features/Login/Auth";
import { Register } from "../../features/Login/Register";
export const LoginActions = () => {
  const [actionIndex, setActionIndex] = useState(0);

  return (
    <div className={styles["login-actions"]}>
      <section className={styles.actions}>
        <Button
          className={(actionIndex === 0 && styles.selected) || ""}
          onClick={() => setActionIndex(0)}
        >
          Sign In
        </Button>
        <Button
          className={(actionIndex === 1 && styles.selected) || ""}
          onClick={() => setActionIndex(1)}
        >
          Sign Up
        </Button>
      </section>
      <section>{actionIndex === 0 ? <Auth /> : <Register />}</section>
    </div>
  );
};

export default LoginActions;
