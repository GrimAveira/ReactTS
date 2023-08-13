import styles from "../../css/components/UI/FormInput.module.css";

const InputForm = (
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

export default InputForm;
