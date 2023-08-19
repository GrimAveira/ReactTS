import styles from "../css/components/Modal.module.css";
import { IModal } from "../interface";

function Modal(props: IModal) {
  const { active, setActive, children } = props;
  return (
    <div
      className={`${styles.modal} ${active ? styles.modalActive : ""}`}
      onMouseDown={() => setActive(false)}
    >
      <div
        className={`${styles.modal__content} ${
          active ? styles.modal__contentActive : ""
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
