import React, { useEffect } from "react";
import styles from "../../css/components/inputAdds/PartForm.module.css";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addPart,
  fetchManufacturers,
} from "../../store/reducers/ActionCreators";
import { changePartForm } from "../../store/reducers/PartFormSlice";
import { IData } from "../../interface";
import Loader from "../Loader";
import CustomError from "../CustomError";

function PartForm() {
  const dispatch = useAppDispatch();
  const part = useAppSelector((state) => state.partFormReducer);
  const fetchManufacturersInfo = useAppSelector(
    (state) => state.fetchManufacturersReducer
  );
  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchManufacturers({
        signal: controller.signal,
        token: localStorage.getItem("token"),
        type: "1",
      })
    );
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      changePartForm({ name: event.target.name, value: event.target.value })
    );
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    dispatch(changePartForm({ name: newValue.name, value: newValue.value }));
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(addPart({ data: part, token: localStorage.getItem("token") }));
  };

  const input = {
    name: "name",
    type: "text",
    placeholder: "Деталь",
    title:
      "Название детали должно состоять из 3-20 символов и не может включать специальные символы кроме пробела!",
    pattern: `^[А-Яа-я ]{3,20}$`,
    required: true,
  };

  const select = {
    name: "manufacturer",
    placeholder: "Прозводитель",
    label: "Прозводитель",
    required: true,
    options: fetchManufacturersInfo.manufacturers.map((man: IData) => {
      return { value: man.id, label: man.name, name: "manufacturer" };
    }),
  };
  if (fetchManufacturersInfo.isLoading) return <Loader />;
  if (fetchManufacturersInfo.error)
    return <CustomError errorText={fetchManufacturersInfo.error} />;
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm onChange={changeHandlerInput} {...input} />
      <FormSelectAppMulti onChange={changeHandlerSelect} {...select} />
      <MyButtonDataBase />
    </form>
  );
}

export default PartForm;
