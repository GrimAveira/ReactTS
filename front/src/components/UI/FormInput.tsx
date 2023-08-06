import styles from "../../css/components/UI/FormInput.module.css";
import { IFormInputProps } from "../../interface";

const FormInput = (props: IFormInputProps) => {
  const { label, errorMessage, onChange } = props;

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <input {...props} className={styles.input} onChange={onChange} />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
