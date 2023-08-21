import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  min,
  step,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        step={step}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
