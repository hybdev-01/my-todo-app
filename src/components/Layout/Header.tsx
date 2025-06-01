import { useContext } from "react";
import styles from "./Header.module.css";
import { UserContext } from "../../store/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <header className={styles.header}>
      <h2 className={styles["logo-text"]}>My Todo App</h2>
      <div className={styles["user-panel"]}>
        <div className={styles["user-text"]}>
          <p>Hi, {user.firstName}</p>
          <a onClick={onLogoutHandler}>Logout</a>
        </div>
        <img
          src="my-todo-app/src/assets/user-icon-default.svg"
          width="48px"
          height="48px"
          alt="user-icon"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export default Header;
