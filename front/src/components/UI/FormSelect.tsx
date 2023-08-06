import React from "react";
import Select from "react-select";
import styles from "../../css/components/UI/FormSelect.module.css";
function FormSelect(props) {
  const { label, regValues, errorMessage, onChange, options, ...selectProps } =
    props;

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <Select
        options={options}
        onChange={onChange}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            ...styles.select,
          }),
        }}
        className={styles.select}
        {...selectProps}
      />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
}

export default FormSelect;
