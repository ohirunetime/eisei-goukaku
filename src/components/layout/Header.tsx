import React, { useState } from "react";
import * as styles from "@/styles/layout/header.module.scss";
import { Link } from "gatsby";
import { useAuth } from "@/contexts/AuthContext";


const Header = () => {
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link to={`/`} className={styles.header__title}>
                    衛生管理者合格ナビ
                </Link>
                <button
                    className={styles.header__hamburger}
                    aria-label="メニュー"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span className={styles.header__hamburgerBar}></span>
                    <span className={styles.header__hamburgerBar}></span>
                    <span className={styles.header__hamburgerBar}></span>
                </button>
                <nav
                    className={
                        styles.header__nav +
                        (menuOpen ? " " + styles["header__navOpen"] : "")
                    }
                >
                    {user ? (
                        <>
                            <Link to="/saved" className={styles.header__link}>
                                保存済み
                            </Link>
                            <Link to="/logout" className={styles.header__link}>
                                ログアウト
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className={styles.header__link}>
                            ログイン
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;