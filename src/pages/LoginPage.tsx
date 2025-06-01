import AuthorInfo from "../components/AuthorInfo";
import LoginActions from "../components/Login/LoginActions";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <h1 className={styles.logo}>My Todo App</h1>
      <figure className={styles["logo-img"]}>
        <img src="/app-logo-medium-img.png" alt="app-img" loading="lazy" />
      </figure>
      <LoginActions />
      <AuthorInfo />
    </div>
  );
};

export default LoginPage;
