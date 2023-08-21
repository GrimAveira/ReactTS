import { useEffect, useState } from "react";
import styles from "../../css/components/inputAdds/EditElevatorForm.module.css";
import EditElevatorFormSingle from "./EditElevatorFormSingle";
import { IElevator } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddresses,
  fetchElevators,
} from "../../store/reducers/ActionCreators";
import Loader from "../Loader";
import CustomError from "../CustomError";

function EditElevatorForm() {
  const dispatch = useAppDispatch();
  const fetchAddressesInfo = useAppSelector(
    (state) => state.fetchAddressesReducer
  );
  const fetchElevatorsInfo = useAppSelector(
    (state) => state.fetchElevatorsReducer
  );
  const [triger, setTriger] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    dispatch(fetchElevators({ signal: controller.signal, token: token }));
    dispatch(fetchAddresses({ signal: controller.signal, token: token }));
    return () => {
      controller.abort();
    };
  }, [triger, dispatch]);
  if (fetchAddressesInfo.isLoading || fetchElevatorsInfo.isLoading)
    return <Loader />;
  if (fetchAddressesInfo.error || fetchElevatorsInfo.error)
    return (
      <CustomError
        errorText={`${fetchAddressesInfo.error} ${fetchElevatorsInfo.error}`}
      />
    );
  return (
    <div className={styles.container}>
      {fetchElevatorsInfo.elevators.map((elevator: IElevator, idx) => (
        <EditElevatorFormSingle
          setTriger={setTriger}
          key={idx}
          elevatorId={elevator.serial_number.toString()}
          area={elevator.area}
          street={elevator.street}
          house={elevator.house}
          entrance={elevator.entrance}
          elevatorAddressId={elevator.address}
          addresses={fetchAddressesInfo.addresses}
        />
      ))}
    </div>
  );
}

export default EditElevatorForm;
