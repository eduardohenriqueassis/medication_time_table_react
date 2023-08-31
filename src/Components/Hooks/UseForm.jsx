import React from "react";
import { UserContext } from "./../../UserContext";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: "Preencha um email válido.",
  },
  number: {
    regex: /^\d+|\d+\,\d$/,
    message: "Coloque um número válido.",
  },
  date: {
    regex: /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/,
    message: "Escolha uma data.",
  },
};

const UseForm = (type, hours) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const { medicationData } = React.useContext(UserContext);
  const [step, setStep] = React.useState("0.5");

  React.useEffect(() => {
    setDisabled(true);
  }, []);

  function validateTypes(value, hours) {
    if (hours === "hours") setDisabledState(value, hours);
    if (type === false) return true;
    if (value.length === 0) {
      setError(type ? types[type].message : "Escolha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function fillInputs(value) {
    setValue(value);
  }

  function setDisabledState(value) {
    if ((value === "Hora atual" || value === "") && hours) {
      setDisabled(true);
      return true;
    } else {
      setDisabled(false);
      return false;
    }
  }

  function onChange({ target }) {
    const elementName = target.attributes.label;
    const inputValue = target.value === "" || target.value === "Hora atual";
    if (error) validateTypes(target.value);
    setValue(target.value);

    target.value === "gota" ? setStep("1") : setStep("0.5");

    if (elementName && elementName.nodeValue === "Horas *" && inputValue) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function getStep() {
    return step;
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validateTypes: () => validateTypes(value),
    onBlur: () => validateTypes(value, hours),
    disabled,
    fillInputs,
    setDisabled: () => setDisabledState(value),
    getStep: () => getStep(value),
  };
};

export default UseForm;
