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
  area: {}[];
  street: {}[];
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
  payload: {}[];
}
export interface IFormSelect {
  onChange: any;
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  options: [];
}
export interface IAddForm {
  setActive: (flag: boolean) => void;
  setModal: (type: number) => void;
  modalType: number;
  text: string;
}
export interface IModal {
  active: boolean;
  setActive: (flag: boolean) => void;
  children: JSX.Element;
}
export interface IAddInputForm {
  errorMessage: string;
  name?: string;
  type: string;
  placeholder: string;
  pattern: string;
  required: boolean;
  onChange: (event: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => void;
}
export interface IFormSelectAppMulti {
  isMulty?: boolean;
  onChange: any;
  name?: string;
  placeholder: string;
  label?: string;
  required: boolean;
  options: any;
}
export interface IInput {
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  pattern: string;
  required: boolean;
}
export interface IISelect {
  name: string;
  placeholder: string;
  label: string;
  required: boolean;
  options: any;
}
export interface IApp {
  area: string;
  breaking: string;
  description: string;
  elevator: number;
  entrance: number;
  finish_date: string;
  house: number;
  id: number;
  start_date: string;
  status: string;
  street: string;
  type: string;
  userName: string;
  userPatronymic: string;
  userSurname: string;
  employees: {}[];
}
export interface IEmployee {
  application_number: number | any;
  name: string;
  patronymic: string;
  personnel_number: number;
  post: number;
  surname: string;
}
export interface IPart {
  id: number;
  application_number: number;
  name: string;
  manufacturer: string;
  quantity: number;
  manufacturer_name?: string;
}
export interface IFormInputProps {
  label?: string;
  errorMessage: string;
  name?: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  placeholder: string;
  type: string;
  pattern: string;
  required: boolean;
  value: string | number;
}
export interface IElevator {
  serial_number: number;
  area: string;
  street: string;
  house: number;
  entrance: number;
  address: string;
}
