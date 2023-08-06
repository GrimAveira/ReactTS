import React from "react";
import AddInputForm from "./AddInputForm";
import axios from "axios";
import styles from "../../css/components/inputAdds/ManufacturerTypeForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ManufacturerTypeForm() {
  const [manufacturerType, setManufacturerType] = useState("");

  const changeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setManufacturerType(event.target.value);
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/manufacturerType",
          { manufacturerType },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        type={"text"}
        placeholder={"Тип прозводителя"}
        errorMessage={
          "Название типа прозиводителя должно состоять из 3-30 символов!"
        }
        pattern={"^[А-яа-я -]{3,30}$"}
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default ManufacturerTypeForm;
