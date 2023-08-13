import Select, { ActionMeta, Props } from "react-select";
import styles from "../../css/components/UI/FormSelectApp.module.css";
function SelectFormApp<StateManagedSelect>(props: StateManagedSelect) {
  return (
    <div className={styles.formInput}>
      <Select className={styles.select} {...props} />
    </div>
  );
}

export default SelectFormApp;
