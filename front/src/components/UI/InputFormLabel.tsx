import styles from "../../css/components/UI/FormInput.module.css";
import { IInputLabel } from "../../interface";

const InputFormLabel = (props: IInputLabel) => {
  const { label, ...remainsProps } = props;

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} {...remainsProps} />
    </div>
  );
};

export default InputFormLabel;
