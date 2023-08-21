import styles from "../../css/components/inputAdds/ListFeaturesForm.module.css";
import { useEffect } from "react";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { IData, IElevator, IInputChanges } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addElevatorFeature,
  fetchElevators,
  fetchFeatures,
} from "../../store/reducers/ActionCreators";
import { changeFeatureList } from "../../store/reducers/ListFeaturesFormSlice";
import Loader from "../Loader";
import CustomError from "../CustomError";

function ListFeaturesForm() {
  const dispatch = useAppDispatch();
  const fetchFeaturesInfo = useAppSelector(
    (state) => state.fetchFeaturesReducer
  );
  const fetchElevatorsInfo = useAppSelector(
    (state) => state.fetchElevatorsReducer
  );
  const featuresList = useAppSelector((state) => state.listFeaturesFormReducer);
  console.log(featuresList);
  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    dispatch(fetchFeatures({ signal: controller.signal, token }));
    dispatch(fetchElevators({ signal: controller.signal, token }));
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      changeFeatureList({ name: event.target.name, value: event.target.value })
    );
  };
  const changeHandlerSelect = (newValue: IInputChanges) => {
    dispatch(changeFeatureList({ name: newValue.name, value: newValue.value }));
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addElevatorFeature({
          data: { featuresList },
          token: localStorage.getItem("token"),
        })
      );
  };
  const input = {
    name: "value",
    type: "text",
    placeholder: "Значение характеристики",
    title: "Значение характеристики должно состоять только из 1-12 симолов",
    pattern: "^[А-Яа-я0-9]{1,12}$",
    required: true,
  };
  const selects = [
    {
      name: "elevator",
      placeholder: "Лифт",
      label: "Лифт",
      required: true,
      options: fetchElevatorsInfo.elevators.map((elevator: IElevator) => {
        return {
          value: elevator.serial_number,
          label: elevator.serial_number,
          name: "elevator",
        };
      }),
    },
    {
      name: "feature",
      placeholder: "Характеристика",
      label: "Характеристика",
      required: true,
      options: fetchFeaturesInfo.features.map((feature: IData) => {
        return {
          value: feature.id,
          label: feature.name,
          name: "feature",
        };
      }),
    },
  ];
  if (fetchFeaturesInfo.isLoading || fetchElevatorsInfo.isLoading)
    return <Loader />;
  if (fetchFeaturesInfo.error || fetchElevatorsInfo.error)
    return (
      <CustomError
        errorText={`${fetchFeaturesInfo.error} ${fetchElevatorsInfo.error}`}
      />
    );
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {selects.map((str) => (
        <FormSelectAppMulti
          key={str.name}
          onChange={changeHandlerSelect}
          {...str}
        />
      ))}
      <AddInputForm onChange={changeHandlerInput} {...input} />
      <MyButtonDataBase />
    </form>
  );
}

export default ListFeaturesForm;
