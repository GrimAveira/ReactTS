import styles from "../../css/pages/Contacts.module.css";

function Contacts() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>Контакты</div>
        <div className={styles.text}>Адрес: Тверская улица, д.13</div>
        <div className={styles.text}>Контактный телефон: +79371818551</div>
        <div className={styles.text}>
          Адрес электронной почты: st.tryed@gmail.com
        </div>
      </div>
    </div>
  );
}

export default Contacts;
