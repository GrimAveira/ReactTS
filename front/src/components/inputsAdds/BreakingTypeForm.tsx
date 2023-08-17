import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/BreakingTypeForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { addBreaking } from "../../store/reducers/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";

function BreakingTypeForm() {
  const [breaking, setBreaking] = useState("");
  const dispatch = useAppDispatch();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setBreaking(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addBreaking({
          data: { breaking },
          token: localStorage.getItem("token"),
        })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="breakingType"
        type="text"
        placeholder="Поломка"
        title="Название поломки должно состоять из 3-30 символов!"
        pattern="^[А-яа-я -]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default BreakingTypeForm;
