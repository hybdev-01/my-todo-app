import type { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  children: ReactNode;
  onModalClose: () => void;
}

export const Modal = ({ title, children, onModalClose }: ModalProps) => {
  return (
    <div className={styles.overlay} onClick={onModalClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        {children}
        <button
          type="button"
          className={styles["modal-close"]}
          onClick={onModalClose}
        >
          <img src="/src/assets/close-button-icon.svg" alt="close-button" />
        </button>
      </div>
    </div>
  );
};
