import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/StreetForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addStreet } from "../../store/reducers/ActionCreators";

function StreetForm() {
  const [street, setStreet] = useState("");
  const dispatch = useAppDispatch();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStreet(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addStreet({ data: { street }, token: localStorage.getItem("token") })
      );
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
