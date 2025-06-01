import styles from "./Button.module.css";

import type { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  emtpy?: boolean;
  onClick?: () => void;
}

export const Button = ({
  className,
  children,
  type,
  emtpy,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className || ""} ${
        (emtpy && styles.empty) || ""
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
