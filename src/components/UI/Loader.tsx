import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles["dot-spinner"]}>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
        <div className={styles["dot"]}></div>
      </div>
    </div>
  );
};
