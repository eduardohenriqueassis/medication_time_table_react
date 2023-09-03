const GenerateProcessedMedicationObj = ({
  medication,
  indication,
  dosage,
  dosageType,
  calendar,
  amountOfDays,
  space,
  hoursValues,
  minValues,
}) => {
  function formatStartDate(calendar) {
    const arrDate = calendar.value.split("-");
    const formattedDate = `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
    return formattedDate;
  }

  function calculateEnd(calendar, amountOfDays) {
    const date = new Date(calendar.value);
    date.setDate(date.getDate() + Number(amountOfDays.value));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const newDate = `${day}/${month}/${year}`;
    return newDate;
  }

  function formatSpace(space) {
    let formattedSpace;
    space.value === "1/dia"
      ? (formattedSpace = "1 por dia")
      : (formattedSpace = `${space.value}/${space.value}`);
    return formattedSpace;
  }

  function setMinutes() {
    const todayTime = new Date();
    let minutes = todayTime.getMinutes();

    if (minutes >= 0 && minutes < 15) {
      minutes = "00";
    } else if (minutes >= 15 && minutes < 30) {
      minutes = "15";
    } else if (minutes >= 30 && minutes < 45) {
      minutes = "30";
    } else if (minutes >= 45 && minutes <= 59) {
      minutes = "45";
    }
    return minutes;
  }

  function generateHoursArr(hoursValues, minValues, space) {
    const iterator =
      space.value === "1/dia" ? 24 : +space.value.replace("h", "");
    const times = new Date();
    let startingTime = `${times.getHours()}:${setMinutes()}`;
    let schedule = [startingTime];
    if (hoursValues.value === "Hora atual") {
      for (let i = iterator; i < 24; i += iterator) {
        times.setHours(times.getHours() + iterator);
        schedule.push(`${times.getHours()}:${setMinutes()}`);
      }
    } else {
      times.setHours(hoursValues.value, minValues.value);
      startingTime = `${times.getHours()}:${minValues.value}`;
      schedule[0] = startingTime;
      for (let i = iterator; i < 24; i += iterator) {
        times.setHours(times.getHours() + iterator);
        schedule.push(`${times.getHours()}:${minValues.value}`);
      }
    }
    let counter = schedule.length;
    for (let i = counter; i <= 5; i++) {
      schedule.push(" ");
    }
    return schedule;
  }

  function formatDoseType(dosageType, dosage) {
    let formattedDosageType = dosageType;
    if (
      +dosage >= 2 &&
      formattedDosageType != "" &&
      formattedDosageType != "ml" &&
      !formattedDosageType.endsWith("s")
    ) {
      formattedDosageType = dosageType + "s";
    }
    return formattedDosageType;
  }

  function formatDosage(dosage) {
    if (dosage && dosage.includes(".")) {
      let number = dosage.split(".")[0];
      let decimal = "1/2";
      if (dosage.split(".")[0] === "0") {
        number = "";
      } else {
        number = dosage.split(".")[0];
      }
      return number + " " + decimal;
    } else {
      return dosage;
    }
  }

  return {
    medication: medication.value,
    indication: indication.value,
    dosage: formatDosage(dosage.value),
    dosageType: formatDoseType(dosageType.value, dosage.value),
    start: formatStartDate(calendar),
    end: calculateEnd(calendar, amountOfDays),
    space: formatSpace(space),
    listOfHours: generateHoursArr(hoursValues, minValues, space),
    amountOfDays: amountOfDays.value,
  };
};

export default GenerateProcessedMedicationObj;
