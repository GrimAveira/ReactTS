import styles from "../css/components/ManagerApplicationHeader.module.css";

function ManagerApplicationHeader() {
  return (
    <div className={styles.head}>
      <div className={styles.startDate}>Время создания</div>
      <div className={styles.finishDate}>Время завершения</div>
      <div className={styles.description}>Описание</div>
      <div className={styles.typeApp}>Тип заявки</div>
      <div className={styles.typeBr}>Тип поломки</div>
      <div className={styles.status}>Статус</div>
      <div className={styles.elevator}>Лифт</div>
      <div className={styles.applicant}>Заявитель</div>
      <div className={styles.engeener}>Инженеры</div>
    </div>
  );
}

export default ManagerApplicationHeader;
