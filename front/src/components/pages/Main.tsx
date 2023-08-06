import React from "react";
import styles from "../../css/pages/Main.module.css";

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.forms}>
        <div className={styles.form}>
          <div className={styles.header}>О приложении</div>
          <div className={styles.text}>
            Система организовает процесс работы диспетчеров компании с
            клиентами. Данная система обеспечивает организацию единого подхода
            для всех поступающих заявок как внутри компании, так и от клиентов.
            Реализует возможность отслеживания этапов прохождения заявки через
            исполнителей, таким образом клиент четко понимает, что его обращение
            принято в работу, и на каком оно этапе, а диспетчер способен
            контролировать весь процесс.
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.header}>Технологии и библиотеки</div>
          <div className={styles.text}>
            Приложение реализовано на основе следующих технологий и библиотек:
            axios, express, react, react-router-dom, javascript, node.js
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
