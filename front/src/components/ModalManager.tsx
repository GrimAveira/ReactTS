import React, { useEffect, useState } from "react";
import styles from "../css/components/ModalManager.module.css";
import axios from "axios";
import FormSelectApp from "./UI/SelectApplicationForm";
import ModalManagerHeader from "./ModalManagerHeader";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import FormSelectAppMulti from "./UI/SelectFormMulti";
import { IData, IEmployee, IInputChanges } from "../interface";
import { ActionMeta } from "react-select";

function ModalManager({
  statusBD,
  typeBD,
  breakingBD,
  employees,
  setTriger,
}: {
  statusBD: IData[];
  typeBD: IData[];
  breakingBD: IData[];
  employees: IEmployee[];
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [applicationData, setApplicationData] = useState<{
    type: number;
    breaking: number;
    description: string;
    status: number;
    applicant: string;
    employees: {}[];
  }>({
    type: 0,
    breaking: 0,
    status: 0,
    description: "",
    applicant: "",
    employees: [],
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    try {
      axios
        .get("http://localhost:8800/api/get/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        })
        .then((response) => {
          setUsers(response.data);
        });
    } catch (error: any) {
      console.log(error.message);
    }
    // return () => {
    //   controller.abort();
    // };
  }, []);
  const changeHandlerDescription = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setApplicationData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/add", applicationData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTriger((triger) => !triger);
          alert(response.data);
        })
        .catch((error) => alert(error.response.data));
  };
  const changeHandlerSelect = (
    newValue: IInputChanges,
    actionMeta: ActionMeta<IInputChanges>
  ) => {
    if (newValue.name === "applicant") {
      setApplicationData((prev) => ({
        ...prev,
        [newValue.name]: newValue.value[0],
      }));
    } else
      setApplicationData((prev) => ({
        ...prev,
        [newValue.name]: newValue.value,
      }));
  };
  const changeHandlerMultiSelect = (newValue: any[]) => {
    setApplicationData((prev) => ({
      ...prev,
      employees: newValue.map((v) => v.value),
    }));
  };

  const selects = [
    {
      id: 1,
      isMulti: false,
      placeholder: "Тип заявки",
      label: "Тип заявки",
      required: true,
      options: typeBD.map((type) => {
        return { value: type.id, label: type.name, name: "type" };
      }),
    },
    {
      id: 2,
      isMulti: false,
      placeholder: "Тип поломки",
      label: "Тип поломки",
      required: true,
      options: breakingBD.map((breaking) => {
        return { value: breaking.id, label: breaking.name, name: "breaking" };
      }),
    },
    {
      id: 3,
      isMulti: false,
      placeholder: "Статус заявки",
      label: "Статус заявки",
      required: true,
      options: statusBD.map((status) => {
        return { value: status.id, label: status.name, name: "status" };
      }),
    },
    {
      id: 4,
      isMulti: false,
      placeholder: "Пользователи",
      label: "Пользователи",
      required: true,
      options: users.map(
        (user: {
          id: number;
          address: string;
          login: string;
          surname: string;
          name: string;
        }) => {
          return {
            value: user.id,
            label: `${user.id} ${user.login} ${
              user.surname
            } ${user.name.substring(0, 1)}.${user.surname.substring(0, 1)}.`,
            name: "applicant",
          };
        }
      ),
    },
  ];
  const selectMulti = {
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
  };

  return (
    <div>
      <ModalManagerHeader />
      <div className={styles.container}>
        <textarea
          name="description"
          className={styles.description}
          onChange={changeHandlerDescription}
          placeholder="В подъезде вашего дома сломан/неисправен лифт, что выражается в..."
          value={applicationData.description}
        />
        {selects.map((select) => (
          <FormSelectApp
            key={select.id}
            {...select}
            onChange={changeHandlerSelect}
          />
        ))}
        <div className={styles.address}>
          {userAddress
            ? `${userAddress.area} район, ${userAddress.street} улица, дом ${userAddress.house} подъезд ${userAddress.entrance}`
            : `Заявитель не выбран`}
        </div>
        {
          <FormSelectAppMulti
            {...selectMulti}
            onChange={changeHandlerMultiSelect}
          />
        }
        <MdOutlinePlaylistAddCheck
          className={styles.button}
          onClick={submitHandler}
        />
      </div>
    </div>
  );
}

export default ModalManager;
