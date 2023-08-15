import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/ApplicationStatusForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addAppStatus } from "../../store/reducers/ActionCreators";

function ApplicationStatusForm() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStatus(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addAppStatus({ data: { status }, token: localStorage.getItem("token") })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="status"
        type="text"
        placeholder="Статус заявки"
        title="Название статуса заявки должно состоять из 3-30 символов!"
        pattern="^[А-яа-я ]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default ApplicationStatusForm;
