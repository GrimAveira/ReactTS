import Select from "react-select";
import styles from "../../css/components/UI/FormSelectAppMulti.module.css";
function SelectFormMulti<StateManagedSelect>(props: StateManagedSelect) {
  return (
    <div className={styles.formInput}>
      <Select className={styles.select} {...props} />
    </div>
  );
}

export default SelectFormMulti;
