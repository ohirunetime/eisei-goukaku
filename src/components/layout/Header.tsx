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
                {user ? (
                    <Link to={`/logout`} className={styles.header__link}>
                        ログアウト
                    </Link>
                ) : (
                    <Link to={`/login`} className={styles.header__link}>
                        ログイン
                    </Link>
                )}
            </nav>
        </div>
    </header>;
};
export default Header;