import Select from "react-select";
import styles from "../../css/components/UI/FormSelectApp.module.css";
function FormSelectApp(props: any) {
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

export default FormSelectApp;
