import { useEffect } from "react";
import axios from "axios";
import styles from "../../css/components/inputAdds/ManufacturerForm.module.css";
import { useState } from "react";
import AddInputForm from "../UI/AddInputFormError";
import FormSelectAppMulti from "../UI/SelectFormAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ManufacturerForm() {
  const [manufacturer, setEmployee] = useState({
    name: "",
    type: "",
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/manufacturerType", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setTypes(response.data))
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setEmployee((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    setEmployee((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/manufacturer", manufacturer, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  const input = {
    name: "name",
    type: "text",
    placeholder: "Производитель",
    errorMessage:
      "Название производителя должно состоять из 3-50 символов и не может включать специальные символы кроме пробела!",
    pattern: `^[А-Яа-я ]{3,50}$`,
    required: true,
  };

  const select = {
    name: "type",
    placeholder: "Специализация",
    label: "Специализация",
    required: true,
    options: types.map((type: { id: string; name: string }) => {
      return { value: type.id, label: type.name, name: "type" };
    }),
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm onChange={changeHandlerInput} {...input} />
      <FormSelectAppMulti onChange={changeHandlerSelect} {...select} />
      <MyButtonDataBase />
    </form>
  );
}

export default ManufacturerForm;
