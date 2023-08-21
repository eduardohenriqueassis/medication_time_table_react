import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ label, optionsList, onChange, error, onBlur, value }) => {
  let options = optionsList.map((option, index) => (
    <option className={styles.option} key={index + 1} value={option}>
      {option}
    </option>
  ));

  return (
    <div className={styles.dropdownWrapper}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <div className={styles.inputSelectWrapper}>
        <select
          value={value}
          className={styles.select}
          label={label}
          id={label}
          onChange={onChange}
          onBlur={onBlur}
        >
          {options}
        </select>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Dropdown;
