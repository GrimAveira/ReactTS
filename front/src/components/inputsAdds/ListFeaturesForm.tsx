import styles from "../../css/components/inputAdds/ListFeaturesForm.module.css";
import { useEffect } from "react";
import AddInputForm from "../UI/AddInputForm";
import FormSelectAppMulti from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { IData, IInputChanges } from "../../interface";
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
  const {
    elevatorIsLoading,
    elevators,
    error,
    features,
    featuresIsLoading,
    featuresList,
  } = useAppSelector((state) => state.listFeaturesFormReducer);
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
      options: elevators.map((el) => {
        return { value: el, label: el, name: "elevator" };
      }),
    },
    {
      name: "feature",
      placeholder: "Характеристика",
      label: "Характеристика",
      required: true,
      options: features.map((feature: IData) => {
        return {
          value: feature.id,
          label: feature.name,
          name: "feature",
        };
      }),
    },
  ];
  if (elevatorIsLoading || featuresIsLoading) return <Loader />;
  if (error) return <CustomError errorText={error} />;
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
