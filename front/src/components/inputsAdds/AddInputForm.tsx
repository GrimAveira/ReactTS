import styles from "../../css/components/inputAdds/AddInputForm.module.css";
import { IAddInputForm } from "../../interface";

const AddInputForm = (props: IAddInputForm) => {
  const { errorMessage, name, ...remainsProps } = props;

  return (
    <div className={styles.formInput}>
      <input className={styles.input} {...remainsProps} />
      <span className={styles.span}>{errorMessage}</span>
    </div>
  );
};

export default AddInputForm;
