import { useState } from "react";
import { useEffect } from "react";
import UserApplication from "../UserApplication";
import UserApplicationHeader from "../UserApplicationHeader";
import ManagerApplication from "../ManagerApplication";
import ManagerApplicationHeader from "../ManagerApplicationHeader";
import styles from "../../css/pages/Applications.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../Modal";
import ModalVillage from "../ModalVillage";
import ModalManager from "../ModalManager";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { IApplication } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchApplications,
  fetchApplicationsStatuses,
  fetchApplicationsTypes,
  fetchBreakingTypes,
  fetchElevators,
  fetchEmployeeAll,
  fetchEmployeesApplications,
} from "../../store/reducers/ActionCreators";
import {
  desctructrizationArray,
  paginationApplication,
} from "../../store/reducers/ApplicationFormSlice";
import CustomError from "../CustomError";

function Applications() {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();

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
  const employeesAllFetchInfo = useAppSelector(
    (state) => state.fetchEmployeeReducer
  );

  const [triger, setTriger] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    try {
      dispatch(fetchApplications({ signal: controller.signal, token }));
      dispatch(
        fetchEmployeesApplications({ signal: controller.signal, token })
      );
      dispatch(fetchBreakingTypes({ signal: controller.signal, token }));
      dispatch(fetchApplicationsStatuses({ signal: controller.signal, token }));
      dispatch(fetchApplicationsTypes({ signal: controller.signal, token }));
      dispatch(fetchElevators({ signal: controller.signal, token }));
      dispatch(fetchEmployeeAll({ signal: controller.signal, token }));
    } catch (error) {
      console.log(error);
    }
    return () => {
      controller.abort();
    };
  }, [triger, dispatch]);

  useEffect(() => {
    dispatch(paginationApplication(applicationsFetchInfo.applications));
    dispatch(desctructrizationArray(employeeAppFetchInfo.employeeApp));
  }, [
    applicationsFetchInfo.applications,
    employeeAppFetchInfo.employeeApp,
    dispatch,
  ]);

  if (
    applicationsFetchInfo.isLoading &&
    employeeAppFetchInfo.isLoading &&
    breakingTypesFetchInfo.isLoading &&
    applicationsStatusesFetchInfo.isLoading &&
    applicationsTypesFetchInfo.isLoading &&
    elevatorsFetchInfo.isLoading &&
    employeesAllFetchInfo.isLoading
  )
    return <Loader />;

  if (
    applicationsFetchInfo.error &&
    employeeAppFetchInfo.error &&
    breakingTypesFetchInfo.error &&
    applicationsStatusesFetchInfo.error &&
    applicationsTypesFetchInfo.error &&
    elevatorsFetchInfo.error &&
    employeesAllFetchInfo.error
  )
    return (
      <CustomError
        errorText={
          applicationsFetchInfo.error ||
          employeeAppFetchInfo.error ||
          breakingTypesFetchInfo.error ||
          applicationsStatusesFetchInfo.error ||
          applicationsTypesFetchInfo.error ||
          elevatorsFetchInfo.error ||
          employeesAllFetchInfo.error
        }
      />
    );
  return (
    <div className={styles.container}>
      <div className={styles.applications}>
        {localStorage.getItem("role") === "2" ? (
          <UserApplicationHeader />
        ) : (
          <ManagerApplicationHeader />
        )}
        {localStorage.getItem("role") === "2" &&
          applicationFormInfo.applications[counter] &&
          applicationFormInfo.applications[counter].map((app: IApplication) => {
            return (
              <UserApplication
                key={app.id}
                {...app}
                employees={applicationFormInfo.employeesApp[app.id] || []}
              />
            );
          })}
        {localStorage.getItem("role") === "1" &&
          applicationFormInfo.applications[counter] &&
          applicationFormInfo.applications[counter].map((app: IApplication) => {
            return (
              <ManagerApplication
                key={app.id}
                {...app}
                employeesApp={applicationFormInfo.employeesApp[app.id] || []}
                employees={employeesAllFetchInfo.employees}
                statusBD={applicationsStatusesFetchInfo.statuses}
                typeBD={applicationsTypesFetchInfo.types}
                elevatorBD={elevatorsFetchInfo.elevators}
                breakingBD={breakingTypesFetchInfo.breakingTypes}
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
              statusBD={applicationsStatusesFetchInfo.statuses}
              typeBD={applicationsTypesFetchInfo.types}
              breakingBD={breakingTypesFetchInfo.breakingTypes}
              setTriger={setTriger}
            />
          ) : (
            <ModalVillage setTriger={setTriger} />
          )}
        </Modal>
      </div>
      <Pagination
        counter={counter}
        length={applicationFormInfo.applications.length}
        setCounter={setCounter}
      />
    </div>
  );
}

export default Applications;
