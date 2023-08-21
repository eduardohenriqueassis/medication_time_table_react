import React from "react";
import styles from "./TableHead.module.css";

const TableHead = () => {
  return (
    <div className={styles.tableHead}>
      <div className={`${styles.cell} ${styles.column3}`}>Medicamento</div>
      <div className={`${styles.cell} ${styles.column0}`}>Dosagem</div>
      <div className={`${styles.cell} ${styles.column0}`}>Indicação</div>
      <div className={`${styles.cell} ${styles.column1}`}>Espaço</div>
      <div className={`${styles.cell} ${styles.column2}`}>Início</div>
      <div className={`${styles.cell} ${styles.column2}`}>Fim</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.column4}`}>Hora</div>
      <div className={`${styles.cell} ${styles.action} ${styles.column1}`}>
        <p>Ações</p>
      </div>
    </div>
  );
};

export default TableHead;
