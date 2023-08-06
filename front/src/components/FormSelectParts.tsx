import Select from "react-select";
import styles from "../css/components/FormSelectParts.module.css";
function FormSelectParts(props: any) {
  const { onChange, options, ...selectProps } = props;

  return (
    <div className={styles.formInput}>
      <Select
        options={options}
        onChange={onChange}
        className={styles.select}
        {...selectProps}
      />
    </div>
  );
}

export default FormSelectParts;
