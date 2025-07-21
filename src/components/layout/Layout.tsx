import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as styles from "@/styles/layout/layout.module.scss"
import { Toaster } from "react-hot-toast";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.base}>
            <div className={styles.background}></div>
            <Header />
            <Toaster />
            <main className={styles.wrapper}>{children}</main>
            <Footer />
        </div>
    )
}
export default Layout;