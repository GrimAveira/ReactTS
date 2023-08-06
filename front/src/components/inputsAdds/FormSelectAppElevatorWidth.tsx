import React from "react";
import Select from "react-select";
import styles from "../../css/components/inputAdds/FormSelectAppElevatorWidth.module.css";
function FormSelectAppElevatorWidth(props: any) {
  return (
    <div className={styles.formInput}>
      <Select className={styles.select} {...props} />
    </div>
  );
}

export default FormSelectAppElevatorWidth;
