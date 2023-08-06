import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/components/inputAdds/EditElevatorForm.module.css";
import EditElevatorFormSingle from "./EditElevatorFormSingle";
import { IElevator } from "../../interface";

function EditElevatorForm() {
  const [elevators, setElevators] = useState([]);
  const [triger, setTriger] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/elevator", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((promise) => setElevators(promise.data))
      .catch((err) => alert(err.response.data));
  }, [triger]);
  return (
    <div className={styles.container}>
      {elevators.map((elevator: IElevator, idx) => (
        <EditElevatorFormSingle
          setTriger={setTriger}
          key={idx}
          id={elevator.serial_number}
          area={elevator.area}
          street={elevator.street}
          house={elevator.house}
          entrance={elevator.entrance}
          elevatorAddressId={elevator.address}
        />
      ))}
    </div>
  );
}

export default EditElevatorForm;
