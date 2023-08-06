import { MdCreate } from "react-icons/md";
import styles from "../css/components/AddForm.module.css";
import { IAddForm } from "../interface";

function AddForm(props: IAddForm) {
  const { setActive, setModal, modalType, text } = props;
  const onClickHandler = () => {
    setActive(true);
    setModal(modalType);
  };

  return (
    <div className={styles.form}>
      <div className={styles.text}>{text}</div>
      <MdCreate className={styles.button} onClick={onClickHandler} />
    </div>
  );
}

export default AddForm;
