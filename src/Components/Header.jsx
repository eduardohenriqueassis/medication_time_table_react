import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [active, setActive] = React.useState(false);
  const navigationRoutes = [
    { name: "home", route: "/", linkName: "Home" },
    { name: "table", route: "/table", linkName: "Tabela de Horários" },
    // {
    //   name: "calculate",
    //   route: "/calculate",
    //   linkName: "Cadastrar Medicamento",
    // },
  ];
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.left}>
          <NavLink className={styles.link} to="/">
            <div className={styles.logo}></div>
          </NavLink>
        </div>
        <div className={styles.right}>
          {navigationRoutes.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              className={({ isActive }) => {
                return `${styles.link} ${isActive ? styles.active : ""}`;
              }}
            >
              {item.linkName}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
