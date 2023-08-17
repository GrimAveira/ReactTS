import Select from "react-select";
import styles from "../../css/components/UI/FormSelectApp.module.css";
function SelectForm<StateManagedSelect>(props: StateManagedSelect) {
  return <Select className={styles.select} {...props} />;
}

export default SelectForm;
