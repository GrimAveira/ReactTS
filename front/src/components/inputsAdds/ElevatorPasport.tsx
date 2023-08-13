import { useEffect } from "react";
import axios from "axios";
import styles from "../../css/components/inputAdds/ElevatorPasport.module.css";
import { useState } from "react";
import AddInputForm from "../UI/AddInputFormError";
import FormSelectAppMulti from "../UI/SelectFormAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ElevatorPasport() {
  const [elevatorPassport, setElevatorPassport] = useState({
    serialNumber: "",
    productionYear: "",
    manufacturer: "",
    address: "",
    elevatorType: "",
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [elevatorTypes, setElevatorTypes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/manufacturer", {
        params: { type: "2" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setManufacturers(response.data))
      .catch((err) => alert(err.response.data));
    axios
      .get("http://localhost:8800/api/get/address", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setAddresses(response.data))
      .catch((err) => alert(err.response.data));
    axios
      .get("http://localhost:8800/api/get/elevatorType", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setElevatorTypes(response.data))
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setElevatorPassport((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: string; value: string }) => {
    setElevatorPassport((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/elevator", elevatorPassport, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  const inputs = [
    {
      id: "1",
      name: "serialNumber",
      type: "number",
      placeholder: "Серийный номер",
      errorMessage: "Серийный номер должен состоять только из 1-12 цифр",
      pattern: `^[0-9]{1,12}$`,
      required: true,
    },
    {
      id: "2",
      name: "productionYear",
      type: "number",
      placeholder: "Год производства",
      errorMessage: "Год производства должен состоять только из 4 цифр",
      pattern: `^[0-9]{4}$`,
      required: true,
    },
  ];
  const selects = [
    {
      id: "1",
      name: "manufacturer",
      placeholder: "Производитель",
      label: "Производитель",
      required: true,
      options: manufacturers.map((man: { id: string; name: string }) => {
        return { value: man.id, label: man.name, name: "manufacturer" };
      }),
    },
    {
      id: "2",
      name: "address",
      placeholder: "Адрес",
      label: "Адрес",
      required: true,
      options: addresses.map(
        (address: {
          id: string;
          area: string;
          street: string;
          house: string;
          entrance: string;
        }) => {
          return {
            value: address.id,
            label: `Район ${address.area}, ул.${address.street}, д.${address.house},п. ${address.entrance}`,
            name: "address",
          };
        }
      ),
    },
    {
      id: "3",
      name: "elevatorType",
      placeholder: "Тип лифта",
      label: "Тип лифта",
      required: true,
      options: elevatorTypes.map((type: { id: string; name: string }) => {
        return { value: type.id, label: type.name, name: "elevatorType" };
      }),
    },
  ];

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {inputs.map((input) => (
        <AddInputForm key={input.id} onChange={changeHandlerInput} {...input} />
      ))}
      {selects.map((str) => (
        <FormSelectAppMulti
          key={str.id}
          onChange={changeHandlerSelect}
          {...str}
        />
      ))}
      <MyButtonDataBase />
    </form>
  );
}

export default ElevatorPasport;
