import React, { useEffect, useState } from "react";
import FormSelectAppElevatorWidth from "./FormSelectAppElevatorWidth";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import styles from "../../css/components/inputAdds/EditElevatorFormSingle.module.css";

function EditElevatorFormSingle(props: {
  id: number;
  elevatorAddressId: string;
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
  area: string;
  street: string;
  house: number;
  entrance: number;
}) {
  const { id, elevatorAddressId, setTriger, area, street, house, entrance } =
    props;
  const [address, setAddressId] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/address", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((promise) => setAddresses(promise.data))
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandler = (newValue: { value: string }) => {
    setAddressId(newValue.value);
  };
  const updateHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/elevatorUpdate",
          { address, id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((promise) => alert(promise.data))
        .catch((err) => alert(err.response.data));
  };
  const deleteHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/elevatorDelete",
          { id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((promise) => alert(promise.data))
        .catch((err) => alert(err.response.data));
    setTriger((value) => !value);
  };

  let select = {
    name: "address",
    placeholder: "Адрес",
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
          label: `${address.area} ${address.street} ${address.house} ${address.entrance}`,
        };
      }
    ),
    defaultValue: {
      value: elevatorAddressId,
      label: `${area} ${street} ${house} ${entrance}`,
    },
  };
  return (
    <div className={styles.form}>
      <div className={styles.id}>{id}</div>
      <FormSelectAppElevatorWidth onChange={changeHandler} {...select} />
      <RxUpdate className={styles.button} onClick={updateHandler} />
      <RiDeleteBin2Line className={styles.button} onClick={deleteHandler} />
    </div>
  );
}

export default EditElevatorFormSingle;
