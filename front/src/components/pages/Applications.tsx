import { useState } from "react";
import { useEffect } from "react";
import UserApplication from "../UserApplication";
import UserApplicationHeader from "../UserApplicationHeader";
import ManagerApplication from "../ManagerApplication";
import ManagerApplicationHeader from "../ManagerApplicationHeader";
import styles from "../../css/pages/Applications.module.css";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../Modal";
import ModalVillage from "../ModalVillage";
import ModalManager from "../ModalManager";
import arrayPagination from "../../functions/arrayPagination";
import Pagination from "../Pagination";
import destructurizationArray from "../../functions/destructurizationArray";
import Loader from "../Loader";
import { IApp, IEmployee } from "../../interface";
import { useAppSelector } from "../../hooks/redux";

function Applications() {
  const [modalActive, setModalActive] = useState(false);

  const applicationFormInfo = useAppSelector(
    (state) => state.applicaitonFormReducer
  );

  const applicationsFetchInfo = useAppSelector(
    (state) => state.fetchApplicationsReducer
  );
  const employeeAppFetchInfo = useAppSelector(
    (state) => state.fetchEmployeeAppReducer
  );
  const breakingTypesFetchInfo = useAppSelector(
    (state) => state.fetchBreakingTypesReducer
  );
  const applicationsStatusesFetchInfo = useAppSelector(
    (state) => state.fetchApplicationsStatusesReducer
  );
  const applicationsTypesFetchInfo = useAppSelector(
    (state) => state.fetchApplicationsTypesReducer
  );
  const elevatorsFetchInfo = useAppSelector(
    (state) => state.fetchElevatorsReducer
  );
  const amployeesAllFetchInfo = useAppSelector(
    (state) => state.fetchEmployeeAppReducer
  );

  const [applications, setApplications] = useState([[]]);
  const [employeesApp, setEmployees] = useState({});
  const [breaking, setBreaking] = useState<[]>([]);
  const [status, setStatus] = useState<[]>([]);
  const [type, setType] = useState<[]>([]);
  const [elevator, setElevator] = useState<[]>([]);
  const [employeesAll, setAllEmployees] = useState<IEmployee[]>([]);

  const [triger, setTriger] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8800/api/get/application", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setApplications(arrayPagination(response.data, 3));
        })
        .catch((error) => alert(error.response.data));
      axios
        .get("http://localhost:8800/api/get/employeeApplication", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setEmployees(destructurizationArray(response.data));
        })
        .catch((error) => console.log(error));

      if (localStorage.getItem("role") === "1") {
        axios
          .get("http://localhost:8800/api/get/status", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            setStatus(
              response.data.map(
                (value: { id: number; name: string }) => value.name
              )
            )
          )
          .catch((error) => console.log(error.message));
        axios
          .get("http://localhost:8800/api/get/breaking", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            setBreaking(
              response.data.map(
                (value: { id: number; name: string }) => value.name
              )
            )
          )
          .catch((error) => console.log(error));
        axios
          .get("http://localhost:8800/api/get/elevator", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setElevator(response.data);
          })
          .catch((error) => console.log(error));
        axios
          .get("http://localhost:8800/api/get/type", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            setType(
              response.data.map(
                (value: { id: number; name: string }) => value.name
              )
            )
          )
          .catch((error) => console.log(error));
        axios
          .get("http://localhost:8800/api/get/allEmployees", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setAllEmployees(response.data);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [triger]);
  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.applications}>
        {localStorage.getItem("role") === "2" ? (
          <UserApplicationHeader />
        ) : (
          <ManagerApplicationHeader />
        )}
        {localStorage.getItem("role") === "2"
          ? applications[counter].map((app: IApp) => {
              return (
                <UserApplication
                  key={app.id}
                  {...app}
                  employees={
                    employeesApp[app.id as keyof typeof employeesApp] || []
                  }
                />
              );
            })
          : applications[counter].map((app: IApp) => {
              return (
                <ManagerApplication
                  key={app.id}
                  {...app}
                  employeesApp={
                    employeesApp[app.id as keyof typeof employeesApp] || []
                  }
                  employees={employeesAll}
                  statusBD={status}
                  typeBD={type}
                  elevatorBD={elevator}
                  breakingBD={breaking}
                  area={app.area}
                  street={app.street}
                  house={app.house}
                  entrance={app.entrance}
                />
              );
            })}
        <AiOutlinePlus
          className={styles.button}
          type="submit"
          onClick={() => {
            setModalActive(true);
          }}
        />
        <Modal active={modalActive} setActive={setModalActive}>
          {localStorage.getItem("role") === "1" ? (
            <ModalManager
              statusBD={status}
              typeBD={type}
              breakingBD={breaking}
              setTriger={setTriger}
            />
          ) : (
            <ModalVillage setTriger={setTriger} />
          )}
        </Modal>
      </div>
      <Pagination
        counter={counter}
        length={applications.length}
        setCounter={setCounter}
      />
    </div>
  );
}

export default Applications;
