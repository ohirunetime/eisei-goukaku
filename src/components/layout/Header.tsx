import React from "react";
import * as styles from "@/styles/layout/header.module.scss";
import { Link } from "gatsby";

const Header = () => {
    return <header className={styles.header}>
        <div>
            <Link to={`/`}>
                衛生管理者合格ナビ
            </Link>
        </div>
    </header>;
};
export default Header;