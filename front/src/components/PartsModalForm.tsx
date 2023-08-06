import React from "react";
import PartModalForm from "./PartModalForm";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/components/PartsModalForm.module.css";
import PartPanelForm from "./PartPanelForm";
import { IPart } from "../interface";

function PartsModalForm({ applicationId }: { applicationId: number }) {
  const [partsRow, setPartsRow] = useState([]);
  const [triger, setTriger] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    try {
      axios
        .get("http://localhost:8800/api/get/partView", {
          params: { id: applicationId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        })
        .then((promise) => setPartsRow(promise.data))
        .catch((err) => alert(err.response.data));
    } catch (error) {
      alert(error);
    }
    return () => {
      controller.abort();
    };
  }, [triger, applicationId]);

  return (
    <div className={styles.container}>
      <PartPanelForm applicationId={applicationId} setTriger={setTriger} />
      {partsRow.length ? (
        partsRow.map((part: IPart) => (
          <PartModalForm
            setTriger={setTriger}
            key={part.id}
            rowId={part.id}
            partName={part.name}
            manufacturer={part.manufacturer}
            qty={part.quantity}
          />
        ))
      ) : (
        <div className={styles.empty}>К лифту не прикреплено деталей</div>
      )}
    </div>
  );
}

export default PartsModalForm;
