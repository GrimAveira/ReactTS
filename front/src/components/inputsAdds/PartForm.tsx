import React, { useEffect } from "react";
import axios from "axios";
import styles from "../../css/components/inputAdds/PartForm.module.css";
import { useState } from "react";
import AddInputForm from "./AddInputForm";
import FormSelectAppMulti from "../UI/FormSelectAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function PartForm() {
  const [part, setPart] = useState({
    name: "",
    manufacturer: "",
  });
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/manufacturer", {
        params: { type: "1" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setManufacturers(response.data))
      .catch((err) => console.log(err));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setPart((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    setPart((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/part", part, {
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
    placeholder: "Деталь",
    errorMessage:
      "Название детали должно состоять из 3-20 символов и не может включать специальные символы кроме пробела!",
    pattern: `^[А-Яа-я ]{3,20}$`,
    required: true,
  };

  const select = {
    name: "manufacturer",
    placeholder: "Прозводитель",
    label: "Прозводитель",
    required: true,
    options: manufacturers.map((man: { id: string; name: string }) => {
      return { value: man.id, label: man.name, name: "manufacturer" };
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

export default PartForm;
