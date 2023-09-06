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
    message: "Escolha um valor.",
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
  const [step, setStep] = React.useState("0.5");

  React.useEffect(() => {
    setDisabled(true);
    const storedStep = window.localStorage.getItem("step");
    setStep(storedStep);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("step", step);
  }, [step]);

  function validateTypes(value, hours, isDosageZero) {
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
    if (target.value === "gota") {
      setStep("1");
    } else if (
      target.value === "ml" ||
      target.value === "comprimido" ||
      target.value === "dose" ||
      target.value === ""
    ) {
      setStep("0.5");
    }

    if (elementName && elementName.nodeValue === "Horas *" && inputValue) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function getStep() {
    return step;
  }

  function setAmount(value) {
    setValue(Math.ceil(Number(value)).toString());
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
    setAmount: () => setAmount(value),
  };
};

export default UseForm;
