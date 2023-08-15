import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/AreaForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addArea } from "../../store/reducers/ActionCreators";

function AreaForm() {
  const [area, setArea] = useState("");
  const dispatch = useAppDispatch();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setArea(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addArea({ data: { area }, token: localStorage.getItem("token") })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="area"
        type="text"
        placeholder="Район"
        title="Название района должно состоять из 3-30 символов!"
        pattern="^[А-яа-я -]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default AreaForm;
