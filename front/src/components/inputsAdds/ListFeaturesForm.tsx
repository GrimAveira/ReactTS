import axios from "axios";
import styles from "../../css/components/inputAdds/ListFeaturesForm.module.css";
import { useEffect, useState } from "react";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function ListFeaturesForm() {
  const [featuresList, setFeaturesList] = useState({
    elevator: "",
    feature: "",
    value: "",
  });
  const [features, setFeatures] = useState([]);
  const [elevators, setElevators] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/feature", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setFeatures(response.data))
      .catch((err) => alert(err.response.data));
    axios
      .get("http://localhost:8800/api/get/elevator", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) =>
        setElevators(
          response.data.map(
            (value: { serial_number: string }) => value.serial_number
          )
        )
      )
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setFeaturesList((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    setFeaturesList((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/elevatorFeatures", featuresList, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  const input = {
    name: "value",
    type: "text",
    placeholder: "Значение характеристики",
    errorMessage:
      "Значение характеристики должно состоять только из 1-12 симолов",
    pattern: "^[А-Яа-я0-9-/ .,]{1,12}$",
    required: true,
  };
  const selects = [
    {
      id: "1",
      name: "elevator",
      placeholder: "Лифт",
      label: "Лифт",
      required: true,
      options: elevators.map((el) => {
        return { value: el, label: el, name: "elevator" };
      }),
    },
    {
      id: "2",
      name: "feature",
      placeholder: "Характеристика",
      label: "Характеристика",
      required: true,
      options: features.map((feature: { id: string; name: string }) => {
        return {
          value: feature.id,
          label: feature.name,
          name: "feature",
        };
      }),
    },
  ];

  return (
    <form className={styles.form} onChange={submitHandler}>
      {selects.map((str) => (
        <FormSelectAppMulti
          key={str.id}
          onChange={changeHandlerSelect}
          {...str}
        />
      ))}
      <AddInputForm onChange={changeHandlerInput} {...input} />
      <MyButtonDataBase />
    </form>
  );
}

export default ListFeaturesForm;
