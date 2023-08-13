import React, { useEffect, useState } from "react";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import axios from "axios";
import styles from "../css/components/PartPanelForm.module.css";
import FormSelectParts from "./FormSelectParts";
import FormInput from "./UI/InputFormLabel";
import { IPart } from "../interface";
import InputForm from "./UI/InputForm";

function PartModalForm({
  applicationId,
  setTriger,
}: {
  applicationId: number;
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [parts, setParts] = useState([]);
  const [part, setPart] = useState({
    appicationId: applicationId,
    partId: "",
    qty: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:8800/api/get/part", {
        params: { id: applicationId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: controller.signal,
      })
      .then((promise) => setParts(promise.data))
      .catch((err) => console.log(err.message));
    return () => {
      controller.abort();
    };
  }, [applicationId]);
  const changeHandlerInput = (event: { target: { value: any } }) => {
    setPart((part) => ({ ...part, qty: event.target.value }));
  };
  const changeHandlerSelect = (newValue: { value: any }) => {
    setPart((part) => ({ ...part, partId: newValue.value }));
  };
  const addHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (window.confirm("Вы действительно хотите внести изменения?"))
        axios
          .post("http://localhost:8800/api/post/elevatorParts", part, {
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
  const input = {
    type: "string",
    placeholder: "Количество",
    title:
      "Количество должно состоять из 1-10 символов и не может включать специальные символы!",
    pattern: "^[0-9]{1,10}$",
    required: true,
  };
  const select = {
    placeholder: "Деталь",
    required: true,
    options: parts.map((part: IPart) => {
      return {
        value: part.id,
        label: `Название: ${part.name}. Завод: ${part.manufacturer_name}`,
      };
    }),
  };

  return (
    <div className={styles.form}>
      <FormSelectParts {...select} onChange={changeHandlerSelect} />
      <InputForm {...input} onChange={changeHandlerInput} value={part.qty} />
      <MdOutlinePlaylistAddCheck
        className={styles.button}
        onClick={addHandler}
      />
    </div>
  );
}

export default PartModalForm;
