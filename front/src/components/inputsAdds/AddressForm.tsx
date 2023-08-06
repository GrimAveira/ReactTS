import axios from "axios";
import styles from "../../css/components/inputAdds/AddressForm.module.css";
import { useState, useEffect } from "react";
import AddInputForm from "./AddInputForm";
import FormSelectAppMulti from "../UI/FormSelectAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { IISelect, IInput } from "../../interface";

function AddressForm() {
  const [address, setAddress] = useState({
    area: "",
    street: "",
    house: "",
    entrance: "",
  });
  const [areas, setArea] = useState([]);
  const [streets, setStreet] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/street", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setStreet(response.data))
      .catch((err) => alert(err.response.data));
    axios
      .get("http://localhost:8800/api/get/area", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setArea(response.data))
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    event.preventDefault();
    setAddress((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: string; value: number }) => {
    setAddress((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/address", address, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  const inputs = [
    {
      name: "house",
      type: "number",
      placeholder: "Номер дома",
      errorMessage: "Номер дома должен состоять только из 1-5 цифр",
      pattern: `^[0-9]{1,5}$`,
      required: true,
    },
    {
      name: "entrance",
      type: "number",
      placeholder: "Номер подъезда",
      errorMessage: "Номер подъезда должен состоять только из 1-5 цифр",
      pattern: `^[0-9]{1,5}$`,
      required: true,
    },
  ];
  const selects = [
    {
      name: "street",
      placeholder: "Улица",
      label: "Улица",
      required: true,
      options: streets.map((street: { id: number; name: string }) => {
        return { value: street.id, label: street.name, name: "street" };
      }),
    },
    {
      name: "area",
      placeholder: "Район",
      label: "Район",
      required: true,
      options: areas.map((area: { id: number; name: string }) => {
        return { value: area.id, label: area.name, name: "area" };
      }),
    },
  ];

  return (
    <form className={styles.form} onChange={submitHandler}>
      {inputs.map((input: IInput) => (
        <AddInputForm
          {...input}
          key={input.name}
          onChange={changeHandlerInput}
        />
      ))}
      {selects.map((select: IISelect) => (
        <FormSelectAppMulti
          {...select}
          key={select.name}
          onChange={changeHandlerSelect}
        />
      ))}
      <MyButtonDataBase />
    </form>
  );
}

export default AddressForm;
