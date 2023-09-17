import { useEffect, useState } from "react";
import styles from "../css/components/UserApplication.module.css";
import { IApplication, IEmployee } from "../interface";

function UserApplication(application: IApplication) {
  const { id, start_date, type, breaking, description, status, employees } =
    application;
  const [manager, setManager] = useState("");
  const [engineers, setEngineers] = useState<IEmployee[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    employees.forEach((emp: any) => {
      if (emp.post === 7)
        setManager(
          `${emp.name} ${emp.surname.substring(
            0,
            1
          )}.${emp.patronymic.substring(0, 1)}.`
        );
      else setEngineers((curr) => [...curr, emp]);
    });
    setDate(start_date.split(" ")[0]);
    setTime(start_date.split(" ")[1].substring(0, 5));
  }, [employees, start_date]);

  return (
    <div className={styles.application}>
      <div className={styles.idApplication}>{id}</div>
      <ul className={styles.dataTable}>
        <li className={styles.dataTime}>{time}</li>
        <li className={styles.dataData}>{date}</li>
      </ul>
      <div className={styles.applicationType}>{type}</div>
      <div className={styles.breakingType}>{breaking}</div>
      <p className={styles.description}>{description}</p>
      <div
        className={styles.applicationStatus}
        title={
          (status === "В очереди" && "От 6 до 9 дней") ||
          (status === "Подтверждена" && "От 5 до 8 дней") ||
          (status === "Закупка деталей" && "От двух недель") ||
          (status === "Приостановлена" && "Время неизвестно") ||
          (status === "Ремонт" && "От 1 до 3 дней") ||
          "Время неизвестно"
        }
      >
        {status}
      </div>
      <div className={styles.manager}>
        {!employees ? "Диспетчер устанавливается" : manager}
      </div>
      <ul className={styles.engineersTable}>
        {!employees
          ? "Группа инженеров устанавливается"
          : engineers.map((emp, index) => (
              <li key={index}>
                {`${emp.name} ${emp.surname.substring(
                  0,
                  1
                )}.${emp.patronymic.substring(0, 1)}.`}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default UserApplication;
