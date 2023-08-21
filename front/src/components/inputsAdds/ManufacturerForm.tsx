import { useEffect } from "react";
import styles from "../../css/components/inputAdds/ManufacturerForm.module.css";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addManufacturer,
  fetchManufacturerType,
} from "../../store/reducers/ActionCreators";
import { changeManufacturerFormData } from "../../store/reducers/ManufacturerFormSlice";
import { IData } from "../../interface";
import Loader from "../Loader";
import CustomError from "../CustomError";

function ManufacturerForm() {
  const dispatch = useAppDispatch();
  const manufacturer = useAppSelector((state) => state.manufacturerFormReducer);
  const fetchManufacturerTypeInfo = useAppSelector(
    (state) => state.fetchManufacturerTypesReducer
  );

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchManufacturerType({
        signal: controller.signal,
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      changeManufacturerFormData({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };
  const changeHandlerSelect = (newValue: { name: any; value: any }) => {
    dispatch(
      changeManufacturerFormData({ name: newValue.name, value: newValue.value })
    );
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addManufacturer({
          data: manufacturer,
          token: localStorage.getItem("token"),
        })
      );
  };

  const input = {
    name: "name",
    type: "text",
    placeholder: "Производитель",
    title:
      "Название производителя должно состоять из 3-50 символов и не может включать специальные символы кроме пробела!",
    pattern: `^[А-Яа-я ]{3,50}$`,
    required: true,
  };

  const select = {
    name: "type",
    placeholder: "Специализация",
    label: "Специализация",
    required: true,
    options: fetchManufacturerTypeInfo.manufacturerTypes.map((type: IData) => {
      return { value: type.id, label: type.name, name: "type" };
    }),
  };
  if (fetchManufacturerTypeInfo.isLoading) return <Loader />;
  if (fetchManufacturerTypeInfo.error)
    return <CustomError errorText={fetchManufacturerTypeInfo.error} />;
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm onChange={changeHandlerInput} {...input} />
      <FormSelectAppMulti onChange={changeHandlerSelect} {...select} />
      <MyButtonDataBase />
    </form>
  );
}

export default ManufacturerForm;
