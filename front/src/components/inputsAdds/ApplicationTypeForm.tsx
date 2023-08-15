import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/ApplicationTypeForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addAppType } from "../../store/reducers/ActionCreators";

function ApplicationTypeForm() {
  const dispatch = useAppDispatch();
  const [applicationType, setApplicationType] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setApplicationType(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addAppType({
          data: { appType: applicationType },
          token: localStorage.getItem("token"),
        })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="type"
        type="text"
        placeholder="Тип заявки"
        title="Название типа заявки должно состоять из 3-30 символов!"
        pattern="^[А-яа-я]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default ApplicationTypeForm;
