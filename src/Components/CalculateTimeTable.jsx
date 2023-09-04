import React from "react";
import styles from "./CalculateTimeTable.module.css";
import Input from "./Elements/Input";
import UseForm from "./Hooks/UseForm";
import Button from "./Elements/Button";
import Dropdown from "./Elements/Dropdown";
import Calendar from "./Elements/Calendar";
import Loading from "./Elements/Loading";
import GenerateProcessedMedicationObj from "./Hooks/GenerateProcessedMedicationObj";
import { UserContext } from "../UserContext";
import { useLocation, useNavigate } from "react-router-dom";

const CalculateTimeTable = () => {
  const { medicationData, updateMedication, createMedication, loading } =
    React.useContext(UserContext);
  const location = useLocation();
  const isCreate = location.state;
  const medication = UseForm();
  const indication = UseForm();
  const dosage = UseForm("number");
  const dosageType = UseForm();
  const calendar = UseForm("date");
  const amountOfDays = UseForm();
  const hoursValues = UseForm();
  const minValues = UseForm();
  const space = UseForm();
  const [hoursArrList, setHoursArrList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    let arr = ["", "Hora atual"];
    for (let i = 0; i <= 23; i++) {
      arr.push(i.toString());
    }
    setHoursArrList(arr);
  }, []);

  React.useEffect(() => {
    if (medicationData && !isCreate) {
      let formattedHour = medicationData.listOfHours[0].split(":")[0];
      let formattedMin = medicationData.listOfHours[0].split(":")[1];
      let formattedDosageType = medicationData.dosageType;
      if (
        medicationData.dosageType.charAt(
          medicationData.dosageType.length - 1
        ) === "s"
      ) {
        formattedDosageType = medicationData.dosageType.slice(0, -1);
      }

      let day = medicationData.start.split("/")[0];
      let month = medicationData.start.split("/")[1];
      let year = medicationData.start.split("/")[2];
      let formattedDate = `${year}-${month}-${day}`;
      medication.fillInputs(medicationData.medication);
      indication.fillInputs(medicationData.indication);
      dosage.fillInputs(formatDosage(medicationData.dosage));
      dosageType.fillInputs(formattedDosageType);
      calendar.fillInputs(formattedDate);
      amountOfDays.fillInputs(medicationData.amountOfDays);
      hoursValues.setDisabled();
      hoursValues.fillInputs(formattedHour);
      minValues.fillInputs(formattedMin);
      space.fillInputs(medicationData.space.split("/")[0]);
    }
  }, []);

  function formatDosage(value) {
    if (value.includes("/")) {
      let number = value.split(" ")[0];
      if (number === "") {
        number = "0";
      } else {
        number = value.split(" ")[0];
      }
      return `${number}.5`;
    } else {
      return value;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let disableMin;
    if (hoursValues.disabled) {
      disableMin = true;
    } else {
      disableMin = minValues.validateTypes();
    }

    if (
      space.validateTypes() &&
      medication.validateTypes() &&
      indication.validateTypes() &&
      dosage.validateTypes(true) &&
      dosageType.validateTypes() &&
      calendar.validateTypes() &&
      amountOfDays.validateTypes() &&
      hoursValues.validateTypes() &&
      disableMin
    ) {
      const obj = {
        medication,
        indication,
        dosage,
        dosageType,
        calendar,
        amountOfDays,
        hoursValues,
        minValues,
        space,
      };
      const medicationData = GenerateProcessedMedicationObj({ ...obj });
      createMedication(medicationData);
    } else {
      medication.validateTypes();
      indication.validateTypes();
      dosage.validateTypes();
      dosageType.validateTypes();
      calendar.validateTypes();
      amountOfDays.validateTypes();
      hoursValues.validateTypes();
      hoursValues.disabled
        ? minValues.validateTypes(false)
        : minValues.validateTypes();
      space.validateTypes();
    }
  }

  function editMedication(event) {
    event.preventDefault();
    let disableMin;
    if (hoursValues.disabled) {
      disableMin = true;
    } else {
      disableMin = minValues.validateTypes();
    }

    if (
      space.validateTypes() &&
      medication.validateTypes() &&
      indication.validateTypes() &&
      dosage.validateTypes() &&
      dosageType.validateTypes() &&
      calendar.validateTypes() &&
      amountOfDays.validateTypes() &&
      hoursValues.validateTypes() &&
      disableMin
    ) {
      const obj = {
        medication,
        indication,
        dosage,
        dosageType,
        calendar,
        amountOfDays,
        hoursValues,
        minValues,
        space,
      };
      const updatedMedicationData = GenerateProcessedMedicationObj({ ...obj });
      updateMedication(medicationData.id, updatedMedicationData);
    }
  }

  function handleOnChange(event) {
    dosageType.onChange(event);
    checkAmountField(event);
  }

  function checkAmountField(event) {
    if (event.target.value === "gota" && dosage.value.includes(".")) {
      dosage.setAmount();
    }
  }

  function onBlur(event) {
    dosageType.onBlur(event.target.value);
  }

  return (
    <section className={`${styles.tabWrapper} container`}>
      <h1 className={styles.h1}>Insira os dados do seu medicamento.</h1>
      <form
        className={styles.form}
        onSubmit={isCreate ? handleSubmit : editMedication}
      >
        <div className={styles.medicationIndicationWrapper}>
          <div className={styles.medicationWrapper}>
            <Input
              label="Medicamento *"
              type="text"
              name="medication"
              {...medication}
            />
          </div>

          <div className={styles.indicationWrapper}>
            <Input
              label="Indicação *"
              name="indication"
              type="text"
              {...indication}
            />
          </div>
        </div>

        <div className={styles.dosageDateWrapper}>
          <div className={styles.dosageWrapper}>
            <div className={styles.dosageInputWrapper}>
              <Input
                label="Qtde *"
                name="dosage"
                type="number"
                min={dosageType.getStep()}
                step={dosageType.getStep()}
                {...dosage}
              />
            </div>
            <div className={styles.amountTypeWrapper}>
              <Dropdown
                label="Tipo de medida *"
                optionsList={["", "ml", "gota", "comprimido", "dose"]}
                type="text"
                name="dosageType"
                onChange={handleOnChange}
                onBlur={onBlur}
                error={dosageType.error}
                value={dosageType.value}
                // {...dosageType}
              />
            </div>
          </div>
          <div className={styles.startDaysAmountWrapper}>
            <div className={styles.dateWrapper}>
              <Calendar
                className={styles.inputDate}
                label="Início *"
                name="start"
                type="date"
                {...calendar}
              />
            </div>
            <div className={styles.daysWrapper}>
              <Input
                label="Nº de dias *"
                name="amountOfDays"
                type="number"
                min="1"
                {...amountOfDays}
              />
            </div>
          </div>
        </div>
        <div className={styles.hoursSpaceWrapper}>
          <div className={styles.spaceWrapper}>
            <Dropdown
              label="h/h *"
              optionsList={["", "4h", "6h", "8h", "12h", "1/dia"]}
              name="space"
              type="text"
              {...space}
            />
          </div>
          {hoursValues.disabled ? (
            <div className={styles.hoursMinutes}>
              <div className={styles.hoursAlone}>
                <Dropdown
                  label="Horas *"
                  optionsList={hoursArrList}
                  name="hours"
                  type="text"
                  {...hoursValues}
                />
              </div>
            </div>
          ) : (
            <div className={styles.hoursMinutes}>
              <div className={styles.hours}>
                <Dropdown
                  label="Horas *"
                  optionsList={hoursArrList}
                  name="hours"
                  type="text"
                  {...hoursValues}
                />
              </div>
              <div className={styles.minutes}>
                <Dropdown
                  label="Min*"
                  optionsList={["", "00", "15", "30", "45"]}
                  name="minutes"
                  type="text"
                  {...minValues}
                />
              </div>
            </div>
          )}
        </div>

        {medicationData && !isCreate ? (
          <div className={styles.btnWrapper}>
            <Button>Atualizar</Button>
          </div>
        ) : (
          <div className={styles.btnWrapper}>
            <Button>Cadastrar Novo</Button>
          </div>
        )}
      </form>
      {loading && <Loading />}
      {!isCreate ? (
        <div className={styles.cancelWrapper}>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/table")}
          >
            Voltar
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => window.location.reload()}
          >
            Cadastrar Novo
          </button>
        </div>
      ) : (
        <div className={styles.cancelWrapper}>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/table")}
          >
            Voltar
          </button>
        </div>
      )}
    </section>
  );
};

export default CalculateTimeTable;
