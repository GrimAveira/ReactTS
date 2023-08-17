import Select from "react-select";
import styles from "../../css/components/inputAdds/FormSelectAppElevatorWidth.module.css";
function SelectFormElevatorWidth(props: any) {
  return (
    <div className={styles.formInput}>
      <Select className={styles.select} {...props} />
    </div>
  );
}

export default SelectFormElevatorWidth;
