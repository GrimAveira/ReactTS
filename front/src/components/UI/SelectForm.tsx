import Select from "react-select";
import styles from "../../css/components/UI/FormSelectApp.module.css";
function SelectForm<StateManagedSelect>(props: StateManagedSelect) {
  return (
    <div className={styles.formInput}>
      <Select className={styles.select} {...props} />
    </div>
  );
}

export default SelectForm;
