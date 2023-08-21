import React, { useContext } from "react";
import styles from "./Tables.module.css";
import Button from "./Elements/Button";
import { useNavigate } from "react-router-dom";
import MedicationTable from "./Elements/MedicationTable";
import Loading from "./Elements/Loading";
import { UserContext } from "../UserContext";

const Table = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  // const [medicationData, setMedicationData] = React.useState();

  // async function getMedicationData() {
  //   const { url, options } = GET_MEDICATIONS();
  //   const response = await fetch(url, options);
  //   const json = await response.json();
  //   setMedicationData(json);
  // }
=======
  const { error, loading } = useContext(UserContext);
>>>>>>> medication_adjustments

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
