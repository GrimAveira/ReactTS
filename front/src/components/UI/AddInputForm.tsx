import styles from "../../css/components/inputAdds/AddInputForm.module.css";

const AddInputForm = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <div className={styles.formInput}>
      <input className={styles.input} {...props} />
    </div>
  );
};

export default AddInputForm;
