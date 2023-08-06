import React from "react";
import styles from "../css/components/ModalManagerHeader.module.css";

function ManagerApplicationHeader() {
  return (
    <div className={styles.head}>
      <div className={styles.description}>Описание</div>
      <div className={styles.typeApp}>Тип заявки</div>
      <div className={styles.typeBr}>Тип поломки</div>
      <div className={styles.status}>Статус</div>
      <div className={styles.applicant}>Заявитель</div>
      <div className={styles.address}>Адрес</div>
      <div className={styles.engineers}>Инженеры</div>
    </div>
  );
}

export default ManagerApplicationHeader;
