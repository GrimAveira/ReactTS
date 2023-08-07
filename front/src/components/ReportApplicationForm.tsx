import { useEffect, useState } from "react";
import styles from "../css/components/ReportApplicationForm.module.css";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IEmployee } from "../interface";

function ReportApplicationForm(data: any) {
  const {
    id,
    start_date,
    finish_date,
    type,
    breaking,
    description,
    status,
    elevator,
    userName,
    userSurname,
    userPatronymic,
    employees,
    area,
    street,
    entrance,
    house,
  } = data;

  const [applicant, setApplicant] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [dateFinish, setDateFinish] = useState("");

  useEffect(() => {
    setApplicant(
      `${userSurname} ${userName.substring(0, 1)}.${userPatronymic.substring(
        0,
        1
      )}.`
    );
    setDateStart(start_date.split(" ")[0]);
    setTimeStart(start_date.split(" ")[1].substring(0, 5));
    setDateFinish(finish_date.split(" ")[0]);
    setTimeFinish(finish_date.split(" ")[1].substring(0, 5));
  }, [userSurname, userName, userPatronymic, start_date, finish_date]);

  return (
    <form className={styles.application}>
      <div className={styles.idApplication}>{id}</div>
      <ul className={styles.dataTableStart}>
        <li className={styles.dataTime}>{timeStart}</li>
        <li className={styles.dataData}>{dateStart}</li>
      </ul>
      {status === "Завершена" ? (
        <div>
          <ul className={styles.dataTableFinish}>
            <li className={styles.dataTime}>{timeFinish}</li>
            <li className={styles.dataData}>{dateFinish}</li>
          </ul>
        </div>
      ) : (
        <div className={styles.finish}>{"Заявка ещё не завершена"}</div>
      )}
      <p className={styles.description}>{description}</p>
      <div className={styles.applicationType}>{type}</div>
      <div className={styles.breakingType}>{breaking}</div>
      <div className={styles.applicationStatus}>{status}</div>
      <div className={styles.elevator}>{elevator || "Лифт не выбран"}</div>
      <div className={styles.applicant}>{applicant}</div>
      <ul className={styles.engineersTable}>
        {!employees
          ? "Группа инженеров устанавливается"
          : employees.map((emp: IEmployee, index: number) => (
              <li key={index}>
                {`${emp.name} ${emp.surname.substring(
                  0,
                  1
                )}.${emp.patronymic.substring(0, 1)}.`}
              </li>
            ))}
      </ul>
      <div className={styles.divBlock}>
        <BiMessageRoundedDetail
          title={
            area &&
            street &&
            house &&
            entrance &&
            `${area} район, ${street} улица, дом ${house} подъезд ${entrance}`
          }
          className={styles.message}
        />
      </div>
    </form>
  );
}

export default ReportApplicationForm;
