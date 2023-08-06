import Select from "react-select";
import styles from "../../css/components/UI/FormSelectAppMulti.module.css";
import { IFormSelectAppMulti } from "../../interface";
function FormSelectAppMulti(props: IFormSelectAppMulti) {
  const { onChange } = props;
  return (
    <div className={styles.formInput}>
      <Select {...props} onChange={onChange} className={styles.select} />
    </div>
  );
}

export default FormSelectAppMulti;
