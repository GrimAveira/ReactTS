import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/ElevatorTypeForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addElevatorType } from "../../store/reducers/ActionCreators";

function ElevatorTypeForm() {
  const [elevatorType, setElevatorType] = useState("");
  const dispatch = useAppDispatch();
  const changeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setElevatorType(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addElevatorType({
          data: { elevatorType },
          token: localStorage.getItem("token"),
        })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="elevatorType"
        type="text"
        placeholder="Тип лифта"
        title="Название типа лифта должно состоять из 3-30 символов!"
        pattern="^[А-яа-я ]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default ElevatorTypeForm;
