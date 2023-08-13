import styles from "../../css/components/inputAdds/AddInputForm.module.css";

const AddInputForm = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  const { ...remainsProps } = props;

  return (
    <div className={styles.formInput}>
      <input className={styles.input} {...remainsProps} />
    </div>
  );
};

export default AddInputForm;
