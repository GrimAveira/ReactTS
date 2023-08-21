import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/RoleForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addRole } from "../../store/reducers/ActionCreators";

function RoleForm() {
  const [role, setRole] = useState("");
  const dispatch = useAppDispatch();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRole(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addRole({ data: { role }, token: localStorage.getItem("token") })
      );
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="role"
        type="text"
        placeholder="Роль"
        title="Название роли должно состоять из 3-30 символов!"
        pattern="^[А-яа-я -]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default RoleForm;
