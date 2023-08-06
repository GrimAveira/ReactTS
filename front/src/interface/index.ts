export interface IRegValues {
  login: string;
  password: string;
  confirmPassword: string;
  surname: string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  area: string;
  street: string;
  house: string;
  entrance: string;
  apartment: string;
}
export interface IRegFetch {
  loading: boolean;
  area: [];
  street: [];
  error: { status: boolean; message: string };
}

export interface IRegValuesAction {
  type: string;
  payload: {
    name: string;
    value: string;
  };
}
export interface IRegFetchAction {
  type: string;
  payload?: string;
}
