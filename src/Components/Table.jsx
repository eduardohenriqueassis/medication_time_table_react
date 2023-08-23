import React, { useContext } from "react";
import styles from "./Table.module.css";
import Button from "./Elements/Button";
import { useNavigate } from "react-router-dom";
import MedicationTable from "./Elements/MedicationTable";
import Loading from "./Elements/Loading";
import { UserContext } from "../UserContext";

const Table = () => {
  const navigate = useNavigate();
  const { error, loading } = useContext(UserContext);

  function handleClick(event) {
    event.preventDefault();
    const isCreate = true;
    navigate("/calculate", { state: { isCreate: isCreate } });
  }

  return (
    <div className={`${styles.wrapper} container`}>
      {loading && <Loading />}
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          Tabela com os dias e horários dos seus medicamentos.
        </h1>
        <div className={styles.btnWrapper}>
          <Button onPress={handleClick}>Cadastrar Medicamento</Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <MedicationTable />
      </div>
    </div>
  );
};

export default Table;
