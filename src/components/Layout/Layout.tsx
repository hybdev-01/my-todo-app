import type { ReactNode } from "react";
import styles from "./Layout.module.css";
import Header from "./Header";
import AuthorInfo from "../AuthorInfo";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer>
        <AuthorInfo />
      </footer>
    </>
  );
};

export default Layout;
