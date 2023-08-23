import React from "react";
import TableHead from "./TableHead";
import styles from "./MedicationTable.module.css";
import { UserContext } from "../../UserContext";

const MedicationTable = () => {
  const {
    getMedicationById,
    getMedicationsData,
    allMedications,
    deleteMedication,
  } = React.useContext(UserContext);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getMedicationsData();
  }, []);

  React.useEffect(() => {
    if (allMedications) composeArrRows(allMedications);
  }, [allMedications]);

  function composeArrRows(allMedications) {
    let arr = [];
    for (let element of allMedications) {
      arr.push(element);
    }
    composeRows(arr);
  }

  function handleEdit(event) {
    event.preventDefault();
    const id = event.currentTarget.id;
    const medicationId = id.split("-");
    getMedicationById(medicationId[1]);
  }

  function handleDelete(event) {
    const id = event.currentTarget.id;
    const medicationId = id.split("-")[1];
    deleteMedication(medicationId);
  }

  function composeRows(arr) {
    setRows(
      arr.map((medication) => (
        <div className={styles.row} key={medication.id}>
          <div className={styles.id}>{medication.id}</div>
          <div className={`${styles.cell} ${styles.column3}`}>
            <p className={styles.info}>Medicamento: </p> {medication.medication}
          </div>
          <div className={`${styles.cell} ${styles.column0}`}>
            <p className={styles.info}>Dosagem: </p>
            {medication.dosage} {medication.dosageType}
          </div>
          <div className={`${styles.cell} ${styles.column0}`}>
            <p className={styles.info}>Indicação: </p>
            {medication.indication}
          </div>
          <div className={`${styles.cell} ${styles.column1}`}>
            <p className={styles.info}>Espaço: </p>
            {medication.space}
          </div>
          <div className={`${styles.cell} ${styles.column2}`}>
            <p className={styles.info}>Início: </p>
            {medication.start}
          </div>
          <div className={`${styles.cell} ${styles.column2}`}>
            <p className={styles.info}>Fim: </p>
            {medication.end}
          </div>
          {medication.listOfHours.map((hour, index) => (
            <div key={index} className={`${styles.cell} ${styles.column4}`}>
              <p className={styles.info}>Hora-{index + 1}: </p>
              {hour}
            </div>
          ))}
          <div
            className={`${styles.cell} ${styles.lastCell} ${styles.column1}`}
          >
            <div className={styles.iconsWrapper}>
              <button
                className={`${styles.edit} ${styles.btn}`}
                id={`edit-${medication.id}`}
                onClick={handleEdit}
              >
                <img src="/src/Assets/edit.png" alt="edit" />
              </button>
              <button
                className={`${styles.delete} ${styles.btn}`}
                id={`delete-${medication.id}`}
                onClick={handleDelete}
              >
                <img src="/src/Assets/delete.png" alt="edit" />
              </button>
            </div>
          </div>
        </div>
      ))
    );
  }

  return (
    <div className={styles.medicationTableWrapper}>
      <TableHead />
      <div className={styles.rowsWrapper}>{rows}</div>
    </div>
  );
};

export default MedicationTable;
