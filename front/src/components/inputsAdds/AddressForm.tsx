import axios from "axios";
import styles from "../../css/components/inputAdds/AddressForm.module.css";
import { useEffect } from "react";
import AddInputForm from "../UI/AddInputFormError";
import FormSelectAppMulti from "../UI/SelectFormAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { IISelect, IInput } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchArea, fetchStreet } from "../../store/reducers/ActionCreators";
import Loader from "../Loader";
import Error from "../Error";
import { changeAddressState } from "../../store/reducers/AddressFormSlice";

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

  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/address", address, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };
  console.log(address);
  const inputs = [
    {
      id: "1",
      name: "house",
      type: "string",
      placeholder: "Номер дома",
      errorMessage: "Номер дома должен состоять только из 1-5 цифр",
      pattern: `^[0-9]{1,5}$`,
      required: true,
    },
    {
      id: "2",
      name: "entrance",
      type: "string",
      placeholder: "Номер подъезда",
      errorMessage: "Номер подъезда должен состоять только из 1-5 цифр",
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
      options: streetsInfo.street.map(
        (street: { id: number; name: string }) => {
          return { value: street.id, label: street.name, name: "street" };
        }
      ),
    },
    {
      name: "area",
      placeholder: "Район",
      label: "Район",
      required: true,
      options: areasInfo.area.map((area: { id: number; name: string }) => {
        return { value: area.id, label: area.name, name: "area" };
      }),
    },
  ];
  if (areasInfo.isLoading || streetsInfo.isLoading) return <Loader />;
  if (areasInfo.error || streetsInfo.error)
    return <Error errorText={`${areasInfo.area || streetsInfo.error}`} />;
  return (
    <form className={styles.form} onChange={submitHandler}>
      {inputs.map((input: IInput) => (
        <AddInputForm {...input} key={input.id} onChange={changeHandlerInput} />
      ))}
      {selects.map((select: IISelect) => (
        <FormSelectAppMulti
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
