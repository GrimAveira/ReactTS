import React, { useEffect } from "react";
import styles from "../../css/components/inputAdds/ElevatorPasport.module.css";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addElevator,
  fetchAddresses,
  fetchElevatorTypes,
  fetchManufacturers,
} from "../../store/reducers/ActionCreators";
import { changeElevatorPassport } from "../../store/reducers/PassportElevatorFormSlice";
import { IAddress, IData, IInputChanges } from "../../interface";
import Loader from "../Loader";
import CustomError from "../CustomError";

function ElevatorPassport() {
  const dispatch = useAppDispatch();
  const elevatorInfo = useAppSelector((state) => state.passportElevatorReducer);
  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    dispatch(
      fetchManufacturers({ signal: controller.signal, token, type: "2" })
    );
    dispatch(fetchAddresses({ signal: controller.signal, token }));
    dispatch(fetchElevatorTypes({ signal: controller.signal, token }));
    return () => {
      controller.abort();
    };
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      changeElevatorPassport({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };
  const changeHandlerSelect = (newValue: IInputChanges) => {
    dispatch(
      changeElevatorPassport({ name: newValue.name, value: newValue.value })
    );
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addElevator({
          elevatorPassport: elevatorInfo.elevatorPassport,
          token: localStorage.getItem("token"),
        })
      );
  };
  if (
    elevatorInfo.addressesIsLoading ||
    elevatorInfo.elevatorTypesIsLoading ||
    elevatorInfo.manufacturersIsLoading
  )
    return <Loader />;
  if (elevatorInfo.error) return <CustomError errorText={elevatorInfo.error} />;
  const inputs = [
    {
      name: "serialNumber",
      type: "number",
      placeholder: "Серийный номер",
      title: "Серийный номер должен состоять только из 1-12 цифр",
      pattern: `^[0-9]{1,12}$`,
      required: true,
    },
    {
      name: "productionYear",
      type: "number",
      placeholder: "Год производства",
      title: "Год производства должен состоять только из 4 цифр",
      pattern: `^[0-9]{4}$`,
      required: true,
    },
  ];
  const selects = [
    {
      name: "manufacturer",
      placeholder: "Производитель",
      label: "Производитель",
      required: true,
      options: elevatorInfo.manufacturers.map((man: IData) => {
        return { value: man.id, label: man.name, name: "manufacturer" };
      }),
    },
    {
      name: "address",
      placeholder: "Адрес",
      label: "Адрес",
      required: true,
      options: elevatorInfo.addresses.map((address: IAddress) => {
        return {
          value: address.id,
          label: `Район ${address.area}, ул.${address.street}, д.${address.house},п. ${address.entrance}`,
          name: "address",
        };
      }),
    },
    {
      name: "elevatorType",
      placeholder: "Тип лифта",
      label: "Тип лифта",
      required: true,
      options: elevatorInfo.elevatorTypes.map((type: IData) => {
        return { value: type.id, label: type.name, name: "elevatorType" };
      }),
    },
  ];

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {inputs.map((input) => (
        <AddInputForm
          key={input.name}
          onChange={changeHandlerInput}
          {...input}
        />
      ))}
      {selects.map((str) => (
        <FormSelectAppMulti
          key={str.name}
          onChange={changeHandlerSelect}
          {...str}
        />
      ))}
      <MyButtonDataBase />
    </form>
  );
}

export default ElevatorPassport;
