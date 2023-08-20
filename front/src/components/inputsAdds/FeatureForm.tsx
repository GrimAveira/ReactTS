import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/FeatureForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addFeature } from "../../store/reducers/ActionCreators";

function FeatureForm() {
  const [feature, setFeature] = useState("");
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFeature(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addFeature({ data: { feature }, token: localStorage.getItem("token") })
      );
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="feature"
        type="text"
        placeholder="Характеристика"
        title="Название характеристики должно состоять из 3-30 символов!"
        pattern="^[А-яа-я -]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default FeatureForm;
