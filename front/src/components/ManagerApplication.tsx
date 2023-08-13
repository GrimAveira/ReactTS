import styles from "../css/components/ManagerApplication.module.css";
import FormSelectApp from "./UI/SelectFormApp";
import FormSelectAppMulti from "./UI/SelectFormAppMulti";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { MdCreate } from "react-icons/md";
import axios from "axios";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import Modal from "./Modal";
import PartsModalForm from "./PartsModalForm";
import { IElevator, IEmployee } from "../interface";

function ManagerApplication(data: {
  id: number;
  start_date: string;
  finish_date: string;
  type: string;
  breaking: string;
  description: string;
  status: string;
  elevator: number;
  userName: string;
  userSurname: string;
  userPatronymic: string;
  employees: IEmployee[];
  typeBD: [];
  breakingBD: [];
  statusBD: [];
  elevatorBD: [];
  employeesApp: [];
  area: string;
  street: string;
  entrance: number;
  house: number;
}) {
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
    typeBD,
    breakingBD,
    statusBD,
    elevatorBD,
    employeesApp,
    area,
    street,
    entrance,
    house,
  } = data;

  const [modalActive, setModalActive] = useState(false);
  const [application, setApplication] = useState<{
    id: number;
    type: string;
    breaking: string;
    description: string;
    status: string;
    elevator: number;
    employees: {}[];
  }>({
    id: 0,
    type: "",
    breaking: "",
    description: "",
    status: "",
    elevator: 0,
    employees: [],
  });
  const [applicant, setApplicant] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [selects, setSelects] = useState<{}[]>([]);

  const submitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .put("http://localhost:8800/api/post/update", application, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => alert(response.data))
        .catch((error) => alert(error.response.data));
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    setApplication((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const changeHandlerMultiSelect = (newValue: any[]) => {
    setApplication((prev) => ({
      ...prev,
      employees: newValue.map((v) => v.value),
    }));
  };
  const changeHandlerTextArea = (event: {
    target: { name: any; value: any };
  }) => {
    setApplication((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useLayoutEffect(() => {
    setApplication((application) => ({
      ...application,
      id: id,
      type: type,
      breaking: breaking,
      description: description,
      status: status,
      elevator: elevator,
    }));
  }, [id, type, breaking, description, status, elevator]);
  const selectMulti = useMemo(() => {
    return {
      id: 1,
      isMulti: true,
      placeholder: "Рабочие",
      required: true,
      options: employees.map((employee: IEmployee) => {
        return {
          value: employee.personnel_number,
          label: `${employee.personnel_number} ${
            employee.surname
          } ${employee.name.substring(0, 1)}.${employee.patronymic.substring(
            0,
            1
          )}. Должность: ${employee.post}`,
        };
      }),
      defaultValue: employeesApp.map((employee: IEmployee) => ({
        value: employee.personnel_number,
        label: `${employee.personnel_number} ${
          employee.surname
        } ${employee.name.substring(0, 1)}.${employee.patronymic.substring(
          0,
          1
        )}. Должность: ${employee.post}`,
      })),
    };
  }, [employees, employeesApp]);
  useEffect(() => {
    setApplication((application) => ({
      ...application,
      employees: employeesApp.map(
        (employee: IEmployee) => employee.personnel_number
      ),
    }));
  }, [employeesApp]);
  useEffect(() => {
    setSelects([
      {
        id: 1,
        isMulti: false,
        placeholder: "Тип заявки",
        label: "Тип заявки",
        required: true,
        options: typeBD.map((type) => {
          return { value: type, label: type, name: "type" };
        }),
        defaultValue: { label: type, value: type },
      },
      {
        id: 2,
        isMulti: false,
        placeholder: "Тип поломки",
        label: "Тип поломки",
        required: true,
        options: breakingBD.map((breaking) => {
          return { value: breaking, label: breaking, name: "breaking" };
        }),
        defaultValue: { label: breaking, value: breaking },
      },
      {
        id: 3,
        isMulti: false,
        placeholder: "Статус заявки",
        label: "Статус заявки",
        required: true,
        options: statusBD.map((status) => {
          return { value: status, label: status, name: "status" };
        }),
        defaultValue: { label: status, value: status },
      },
      {
        id: 4,
        isMulti: false,
        placeholder: "Серийный номер лифта",
        label: "Серийный номер лифта",
        required: true,
        options: elevatorBD.map((elevator: IElevator) => {
          return {
            value: elevator.serial_number,
            label: `${elevator.serial_number} ${elevator.area} район, ${elevator.street} улица, дом ${elevator.house} подъезд ${elevator.entrance}`,
            name: "elevator",
          };
        }),
        defaultValue: { label: elevator, value: elevator },
      },
    ]);
  }, [
    typeBD,
    statusBD,
    elevatorBD,
    breakingBD,
    elevator,
    breaking,
    status,
    type,
  ]);
  useEffect(() => {
    setDateStart(start_date.split(" ")[0]);
    setTimeStart(start_date.split(" ")[1].substring(0, 5));
    setDateFinish(finish_date.split(" ")[0]);
    setTimeFinish(finish_date.split(" ")[1].substring(0, 5));
  }, [start_date, finish_date]);
  useEffect(() => {
    setApplicant(
      `${userSurname} ${userName.substring(0, 1)}.${userPatronymic.substring(
        0,
        1
      )}.`
    );
  }, [userName, userSurname, userPatronymic]);

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
      <textarea
        className={styles.description}
        name="description"
        onChange={changeHandlerTextArea}
        placeholder="Описание заявки"
        value={application.description}
      />
      {selects.map((select: any) => (
        <FormSelectApp
          key={select.id}
          {...select}
          onChange={changeHandlerSelect}
        />
      ))}
      <div className={styles.applicant}>{applicant}</div>
      {
        <FormSelectAppMulti
          key={selectMulti.id}
          {...selectMulti}
          onChange={changeHandlerMultiSelect}
        />
      }
      <div className={styles.divBlock}>
        <BiMessageRoundedDetail
          title={
            (area &&
              street &&
              house &&
              entrance &&
              `${area} район, ${street} улица, дом ${house} подъезд ${entrance}`) ||
            "Адрес отсутствует"
          }
          className={styles.message}
        />
        <TbListDetails
          className={styles.detail}
          onClick={() => setModalActive((active) => !active)}
        />
        <MdCreate
          className={styles.button}
          type="submit"
          onClick={submitHandler}
        />
        <Modal active={modalActive} setActive={setModalActive}>
          <PartsModalForm applicationId={id} />
        </Modal>
      </div>
    </form>
  );
}

export default ManagerApplication;
