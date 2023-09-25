import React, { useEffect } from "react";
import styles from "../css/components/ModalManager.module.css";
import FormSelectApp from "./UI/SelectApplicationForm";
import ModalManagerHeader from "./ModalManagerHeader";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import FormSelectAppMulti from "./UI/SelectFormMulti";
import { IData, IEmployee, IUserView } from "../interface";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addApplication, fetchUsers } from "../store/reducers/ActionCreators";
import {
  changeApplicationData,
  changeAppsEmployees,
  changeCurrentUser,
} from "../store/reducers/ModalManagerFormSlice";

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
  const dispatch = useAppDispatch();
  const formInfo = useAppSelector((state) => state.modalManagerFormReducer);
  const fetchUsersInfo = useAppSelector((state) => state.fetchUsersReducer);
  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchUsers({
        signal: controller.signal,
        token: localStorage.getItem("token"),
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch]);
  const changeHandlerDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    dispatch(
      changeApplicationData({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };
  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?")) {
      dispatch(
        addApplication({
          data: {
            ...formInfo.applicationData,
            employees: formInfo.employeesApplication,
          },
          token: localStorage.getItem("token"),
        })
      );
      setTriger((value) => !value);
    }
  };
  const changeHandlerSelect = (newValue: any) => {
    if (newValue.name === "applicant") {
      dispatch(changeCurrentUser(newValue.value));
      dispatch(
        changeApplicationData({
          name: "applicant",
          value: newValue.value.id,
        })
      );
    } else
      dispatch(
        changeApplicationData({ name: newValue.name, value: newValue.value })
      );
  };
  const changeHandlerMultiSelect = (
    newValue: { value: number; label: string }[]
  ) => {
    console.log(newValue);
    dispatch(changeAppsEmployees(newValue.map((value) => value.value)));
  };
  const selects = [
    {
      isMulti: false,
      placeholder: "Тип заявки",
      label: "Тип заявки",
      required: true,
      options: typeBD.map((type) => {
        return { value: type.id, label: type.name, name: "type" };
      }),
    },
    {
      isMulti: false,
      placeholder: "Тип поломки",
      label: "Тип поломки",
      required: true,
      options: breakingBD.map((breaking) => {
        return { value: breaking.id, label: breaking.name, name: "breaking" };
      }),
    },
    {
      isMulti: false,
      placeholder: "Статус заявки",
      label: "Статус заявки",
      required: true,
      options: statusBD.map((status) => {
        return { value: status.id, label: status.name, name: "status" };
      }),
    },
    {
      isMulti: false,
      placeholder: "Пользователи",
      label: "Пользователи",
      required: true,
      options: fetchUsersInfo.users.map((user: IUserView) => {
        return {
          value: user,
          label: `${user.id} ${user.login} ${
            user.surname
          } ${user.name.substring(0, 1)}.${user.surname.substring(0, 1)}.`,
          name: "applicant",
        };
      }),
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
          value={formInfo.applicationData.description}
        />
        {selects.map((select) => (
          <FormSelectApp
            key={select.label}
            {...select}
            onChange={changeHandlerSelect}
          />
        ))}
        <div className={styles.address}>
          {formInfo.currentUser
            ? `${formInfo.currentUser.area} район, ${formInfo.currentUser.street} улица, дом ${formInfo.currentUser.house} подъезд ${formInfo.currentUser.entrance}`
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
