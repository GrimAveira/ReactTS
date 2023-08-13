import React from "react";
import AddInputForm from "../UI/AddInputFormError";
import axios from "axios";
import styles from "../../css/components/inputAdds/ApplicationStatusForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ApplicationStatusForm() {
  const [status, setStatus] = useState("");

  const changeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setStatus(event.target.value);
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/applicationStatus",
          { status },
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
    <button className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="status"
        type={"text"}
        placeholder={"Статус заявки"}
        title={"Название статуса заявки должно состоять из 3-30 символов!"}
        pattern={"^[А-яа-я -]{3,30}$"}
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </button>
  );
}

export default ApplicationStatusForm;
