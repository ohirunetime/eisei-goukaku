import React from "react";
import * as styles from "@/styles/layout/header.module.scss";
import { Link } from "gatsby";
import { useAuth } from "@/contexts/AuthContext";


const Header = () => {
    const { user } = useAuth();
    return <header className={styles.header}>
        <div className={styles.header__container}>
            <Link to={`/`} className={styles.header__title}>
                衛生管理者合格ナビ
            </Link>
            <nav className={styles.header__nav}>
               
            </nav>
        </div>
    </header>;
};
export default Header;