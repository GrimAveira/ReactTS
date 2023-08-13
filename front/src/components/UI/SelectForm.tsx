import Select from "react-select";
import styles from "../../css/components/UI/FormInput.module.css";
import { IFormSelect } from "../../interface";
function SelectForm(props: IFormSelect) {
  const { label, ...selectProps } = props;

  return (
    <div className={styles.formInput}>
      <label className={styles.label}>{label}</label>
      <Select className={styles.select} {...selectProps} />
    </div>
  );
}

export default SelectForm;
