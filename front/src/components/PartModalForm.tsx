import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import styles from "../css/components/PartModalForm.module.css";
import FormInput from "./UI/FormInput";

function PartModalForm({
  rowId,
  partName,
  manufacturer,
  setTriger,
  qty,
}: {
  rowId: number;
  partName: string;
  manufacturer: string;
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
  qty: number;
}) {
  const [part, setPart] = useState({
    id: rowId,
    qty: qty,
  });

  const changeHandler = (event: { target: { value: any } }) => {
    setPart((part) => ({ ...part, qty: event.target.value }));
  };
  const updateHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (window.confirm("Вы действительно хотите внести изменения?"))
        axios
          .post("http://localhost:8800/api/post/updateElevatorPart", part, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((promise) => {
            setTriger((triger) => !triger);
            alert(promise.data);
          })
          .catch((err) => alert(err.response.data));
    } catch (error) {
      alert(error);
    }
  };
  const deleteHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (window.confirm("Вы действительно хотите внести изменения?"))
        axios
          .post("http://localhost:8800/api/post/deleteElevatorPart", part, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((promise) => {
            setTriger((triger) => !triger);
            alert(promise.data);
          })
          .catch((err) => alert(err.response.data));
      setTriger((value) => !value);
    } catch (error) {
      alert(error);
    }
  };

  const input = {
    type: "number",
    placeholder: "Количество",
    errorMessage:
      "Количество должно состоять из 1-10 символов и не может включать специальные символы!",
    pattern: "^[0-9]{1,10}$",
    required: true,
  };

  return (
    <div className={styles.form}>
      <div className={styles.name}>{partName}</div>
      <div className={styles.manufacturer}>{manufacturer}</div>
      <FormInput {...input} onChange={changeHandler} value={part.qty} />
      <RxUpdate className={styles.button} onClick={updateHandler} />
      <RiDeleteBin2Line className={styles.button} onClick={deleteHandler} />
    </div>
  );
}

export default PartModalForm;
