import React, { useState } from "react";
import SelectFormElevatorWidth from "../UI/SelectFormElevatorWidth";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import styles from "../../css/components/inputAdds/EditElevatorFormSingle.module.css";
import { IAddress, IInputChanges } from "../../interface";
import { useAppDispatch } from "../../hooks/redux";
import {
  deleteElevator,
  updateElevator,
} from "../../store/reducers/ActionCreators";

function EditElevatorFormSingle(props: {
  elevatorId: string;
  elevatorAddressId: string;
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
  area: string;
  street: string;
  house: number;
  entrance: number;
  addresses: IAddress[];
}) {
  const {
    elevatorId,
    elevatorAddressId,
    setTriger,
    area,
    street,
    house,
    entrance,
    addresses,
  } = props;
  const [addressId, setAddressId] = useState("");
  const dispatch = useAppDispatch();

  const changeHandler = (newValue: IInputChanges) => {
    setAddressId(newValue.value);
  };
  const updateHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        updateElevator({
          addressId: addressId,
          elevatorId: elevatorId,
          token: localStorage.getItem("token"),
        })
      );
    setTriger((value) => !value);
  };
  const deleteHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        deleteElevator({
          elevatorId: elevatorId,
          token: localStorage.getItem("token"),
        })
      );
    setTriger((value) => !value);
  };

  let select = {
    name: "address",
    placeholder: "Адрес",
    required: true,
    options: addresses.map((address: IAddress) => {
      return {
        value: address.id,
        label: `${address.area} ${address.street} ${address.house} ${address.entrance}`,
      };
    }),
    defaultValue: {
      value: elevatorAddressId,
      label: `${area} ${street} ${house} ${entrance}`,
    },
  };
  return (
    <div className={styles.form}>
      <div className={styles.id}>{elevatorId}</div>
      <SelectFormElevatorWidth onChange={changeHandler} {...select} />
      <RxUpdate className={styles.button} onClick={updateHandler} />
      <RiDeleteBin2Line className={styles.button} onClick={deleteHandler} />
    </div>
  );
}

export default EditElevatorFormSingle;
