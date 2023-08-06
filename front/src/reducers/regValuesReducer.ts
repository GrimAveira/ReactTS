import { IRegValues, IRegValuesAction } from "../interface";

export const INITIAL_REG_VALUES = {
  login: "",
  password: "",
  confirmPassword: "",
  surname: "",
  name: "",
  patronymic: "",
  phoneNumber: "",
  area: "",
  street: "",
  house: "",
  entrance: "",
  apartment: "",
};

export const regValueReducer = (
  state: IRegValues,
  action: IRegValuesAction
) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
