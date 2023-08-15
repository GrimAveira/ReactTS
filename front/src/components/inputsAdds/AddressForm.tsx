import styles from "../../css/components/inputAdds/AddressForm.module.css";
import { useEffect } from "react";
import AddInputForm from "../UI/AddInputForm";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { IData, IISelect, IInput } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addAddress,
  fetchArea,
  fetchStreet,
} from "../../store/reducers/ActionCreators";
import Loader from "../Loader";
import Error from "../Error";
import { changeAddressState } from "../../store/reducers/AddressFormSlice";
import SelectForm from "../UI/SelectForm";

function AddressForm() {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.addressReducer);
  const areasInfo = useAppSelector((state) => state.areaReducer);
  const streetsInfo = useAppSelector((state) => state.streetReducer);
  useEffect(() => {
    dispatch(fetchArea());
    dispatch(fetchStreet());
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(
      changeAddressState({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };
  const changeHandlerSelect = (option: { name: string; value: string }) => {
    dispatch(changeAddressState({ name: option.name, value: option.value }));
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addAddress({ data: address, token: localStorage.getItem("token") })
      );
  };
  const inputs = [
    {
      name: "house",
      type: "string",
      placeholder: "Номер дома",
      title: "Номер дома должен состоять только из 1-5 цифр",
      pattern: `^[0-9]{1,5}$`,
      required: true,
    },
    {
      name: "entrance",
      type: "string",
      placeholder: "Номер подъезда",
      title: "Номер подъезда должен состоять только из 1-5 цифр",
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
      options: streetsInfo.street.map((street: IData) => {
        return { value: street.id, label: street.name, name: "street" };
      }),
    },
    {
      name: "area",
      placeholder: "Район",
      label: "Район",
      required: true,
      options: areasInfo.area.map((area: IData) => {
        return { value: area.id, label: area.name, name: "area" };
      }),
    },
  ];
  if (areasInfo.isLoading || streetsInfo.isLoading) return <Loader />;
  if (areasInfo.error || streetsInfo.error)
    return <Error errorText={`${areasInfo.area || streetsInfo.error}`} />;
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {inputs.map((input: IInput) => (
        <AddInputForm
          {...input}
          key={input.name}
          onChange={changeHandlerInput}
        />
      ))}
      {selects.map((select: IISelect) => (
        <SelectForm
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
