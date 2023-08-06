import styles from "../../css/pages/AddPanel.module.css";
import { useState } from "react";
import AddForm from "../AddForm";
import Modal from "../Modal";
import StreetForm from "../inputsAdds/StreetForm";
import RoleForm from "../inputsAdds/RoleForm";
import ManufacturerTypeForm from "../inputsAdds/ManufacturerTypeForm";
import FeatureForm from "../inputsAdds/FeatureForm";
import PostForm from "../inputsAdds/PostForm";
import BreakingTypeForm from "../inputsAdds/BreakingTypeForm";
import ApplicationTypeForm from "../inputsAdds/ApplicationTypeForm";
import ApplicationStatusForm from "../inputsAdds/ApplicationStatusForm";
import ElevatorTypeForm from "../inputsAdds/ElevatorTypeForm";
import AreaForm from "../inputsAdds/AreaForm";
import EmployeeForm from "../inputsAdds/EmployeeForm";
import ManufacturerForm from "../inputsAdds/ManufacturerForm";
import PartForm from "../inputsAdds/PartForm";
import AddressForm from "../inputsAdds/AddressForm";
import ElevatorPasport from "../inputsAdds/ElevatorPasport";
import ListFeaturesForm from "../inputsAdds/ListFeaturesForm";
import EditElevatorForm from "../inputsAdds/EditElevatorForm";

function AddPanel() {
  const [modalActive, setModalActive] = useState(false);
  const [activeModalType, setActiveModalType] = useState(0);

  const addForm = [
    {
      type: 1,
      text: "Добавить тип производителя",
    },
    {
      type: 2,
      text: "Добавить улицу",
    },
    {
      type: 3,
      text: "Добавить роль",
    },
    {
      type: 4,
      text: "Добавить профессию",
    },
    {
      type: 5,
      text: "Добавить поломку  ",
    },

    {
      type: 6,
      text: "Добавить тип заявки  ",
    },
    {
      type: 7,
      text: "Добавить характеристику лифта",
    },
    {
      type: 8,
      text: "Добавить статус заявки  ",
    },

    {
      type: 9,
      text: "Добавить тип лифта",
    },
    {
      type: 10,
      text: "Добавить район  ",
    },
    {
      type: 11,
      text: "Добавить работника",
    },
    {
      type: 12,
      text: "Добавить паспорт лифта",
    },

    {
      type: 13,
      text: "Добавить деталь",
    },
    {
      type: 14,
      text: "Добавать характеристику лифту",
    },
    {
      type: 15,
      text: "Добавить производителя",
    },
    {
      type: 16,
      text: "Добавить адрес",
    },
    {
      type: 17,
      text: "Редактировать лифты",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.addPanel}>
        {addForm.map((form) => (
          <AddForm
            key={form.type}
            setActive={setModalActive}
            setModal={setActiveModalType}
            modalType={form.type}
            text={form.text}
          />
        ))}
        <Modal active={modalActive} setActive={setModalActive}>
          {(activeModalType === 1 && <ManufacturerTypeForm />) ||
            (activeModalType === 2 && <StreetForm />) ||
            (activeModalType === 3 && <RoleForm />) ||
            (activeModalType === 4 && <PostForm />) ||
            (activeModalType === 5 && <BreakingTypeForm />) ||
            (activeModalType === 6 && <ApplicationTypeForm />) ||
            (activeModalType === 7 && <FeatureForm />) ||
            (activeModalType === 8 && <ApplicationStatusForm />) ||
            (activeModalType === 9 && <ElevatorTypeForm />) ||
            (activeModalType === 10 && <AreaForm />) ||
            (activeModalType === 11 && <EmployeeForm />) ||
            (activeModalType === 12 && <ElevatorPasport />) ||
            (activeModalType === 13 && <PartForm />) ||
            (activeModalType === 14 && <ListFeaturesForm />) ||
            (activeModalType === 15 && <ManufacturerForm />) ||
            (activeModalType === 16 && <AddressForm />) ||
            (activeModalType === 17 ? <EditElevatorForm /> : <></>)}
        </Modal>
      </div>
    </div>
  );
}

export default AddPanel;
