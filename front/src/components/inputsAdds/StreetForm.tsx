import AddInputForm from "../UI/AddInputFormError";
import axios from "axios";
import styles from "../../css/components/inputAdds/StreetForm.module.css";
import { SetStateAction, useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function StreetForm() {
  const [street, setStreet] = useState("");

  const changeHandler = (event: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    event.preventDefault();
    setStreet(event.target.value);
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/street",
          { street },
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
        name="street"
        type="text"
        placeholder="Улица"
        title="Название улицы должно состоять из 3-30 символов!"
        pattern="^[А-яа-я- ]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default StreetForm;
