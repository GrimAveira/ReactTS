import React, { useState } from "react";
import styles from "../css/components/ModalVillage.module.css";
import axios from "axios";

function ModalVillage({
  setTriger,
}: {
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [description, setDescription] = useState("");

  const changeHandlerDescription = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event.preventDefault();
    setDescription(event.target.value);
  };
  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post(
          "http://localhost:8800/api/post/add",
          { description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTriger((triger) => !triger);
          alert(response.data);
        })
        .catch((error) => alert(error.response.data));
    setDescription("");
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.description}
        onChange={changeHandlerDescription}
        placeholder="В подъезде вашего дома сломан/неисправен лифт, что выражается в..."
        value={description}
      />
      <button className={styles.button} onClick={submitHandler}>
        Создать заявку
      </button>
    </div>
  );
}

export default ModalVillage;
