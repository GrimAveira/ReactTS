import React from "react";
import styles from "../css/components/UserApplicationHeader.module.css";

function UserApplicationHeader() {
  return (
    <div className={styles.userHead}>
      <div className={styles.userDate}>Время создания заявки</div>
      <div className={styles.userTypeApp}>Тип заявки</div>
      <div className={styles.userTypeBr}>Тип поломки</div>
      <div className={styles.userDescription}>Описание</div>
      <div className={styles.userStatus}>Статус</div>
      <div className={styles.userManager}>Диспетчер</div>
      <div className={styles.userEngeener}>Инженеры</div>
    </div>
  );
}

export default UserApplicationHeader;
