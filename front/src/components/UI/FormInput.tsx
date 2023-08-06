import { useState } from "react";
import styles from "../../css/components/UI/FormInput.module.css";

interface FormInputProps {
  label: string;
  errorMessage: string;
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  placeholder: string;
  type: string;
  pattern: string;
  required: boolean;
  value: string;
}

const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, name } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <input
        {...props}
        className={styles.input}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => name === "confirmPassword" && setFocused(true)}
      />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
