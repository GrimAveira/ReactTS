import { useEffect, useMemo } from "react";
import styles from "../../css/pages/Registration.module.css";
import FormInput from "../UI/FormInput";
import { useNavigate } from "react-router-dom";
import FormSelect from "../UI/FormSelect";
import Loader from "../Loader";
import { IData, IUserInfo } from "../../interface";
import UserService from "../../API/UserService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchNecRegData } from "../../store/reducers/ActionCreators";
import { userRegDataSlice } from "../../store/reducers/UserRegDataSlice";
import Error from "../Error";

function Registration() {
  const dispatch = useAppDispatch();

  const { changeInput } = userRegDataSlice.actions;

  const { area, street, isLoading, error } = useAppSelector(
    (state) => state.necRegDataReducer
  );
  const userData = useAppSelector((state) => state.userRedDataReducer);
  console.log(userData);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchNecRegData({
        signal: controller.signal,
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch]);
  const inputs = [
    {
      id: 1,
      name: "login",
      type: "text",
      placeholder: "Логин",
      errorMessage:
        "Логин должен состоять из 3-16 латинских символов и не может включать специальные символы!",
      label: "Логин",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Пароль",
      errorMessage:
        "Пароль должен состоять из 8-20 латинских символов и включать как минимум 1 букву, 1 цифру и 1 специальный символ!",
      label: "Пароль",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Подтвердить пароль",
      errorMessage: "Пароли не совпадают!",
      label: "Подтвердить пароль",
      pattern: userData.password,
      required: true,
    },
    {
      id: 4,
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      errorMessage:
        "Фамилия должна состоять из 1-20 символов кириллицы и не может включать специальные символы!",
      label: "Фамилия",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      id: 5,
      name: "name",
      type: "text",
      placeholder: "Имя",
      errorMessage:
        "Имя должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
      label: "Имя",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      id: 6,
      name: "patronymic",
      type: "text",
      placeholder: "Отчество",
      errorMessage:
        "Отчетсво должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
      label: "Отчество",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      id: 7,
      name: "phoneNumber",
      type: "number",
      placeholder: "Телефонный номер",
      errorMessage: "Мобильный номер должен состоять только из 11 цифр!",
      label: "Телефонный номер",
      pattern: "^[0-9]{11}$",
      required: true,
    },
    {
      id: 8,
      name: "house",
      type: "number",
      placeholder: "Номер дома",
      errorMessage: "Номер дома должен состоять из 1-5 цифр!",
      label: "Номер дома",
      pattern: "^[0-9]{1,5}$",
      required: true,
    },
    {
      id: 9,
      name: "entrance",
      type: "number",
      placeholder: "Номер подъезда",
      errorMessage: "Номер подъезда должен состоять из 1-5 цифр!",
      label: "Номер подъезда",
      pattern: "^[0-9]{1,5}$",
      required: true,
    },
    {
      id: 10,
      name: "apartment",
      type: "number",
      placeholder: "Номер квартиры",
      errorMessage: "Номер квартиры должен состоять из 1-3 цифр!",
      label: "Номер квартиры",
      pattern: "^[0-9]{1,3}$",
      required: true,
    },
  ];
  const selects = useMemo(() => {
    return [
      {
        id: 1,
        name: "area",
        placeholder: "Район",
        label: "Район",
        required: true,
        options: area.map((area: IData) => {
          return { value: area.id, label: area.name, name: "area" };
        }),
      },
      {
        id: 2,
        name: "street",
        placeholder: "Улица",
        label: "Улица",
        required: true,
        options: street.map((street: IData) => {
          return { value: street.id, label: street.name, name: "street" };
        }),
      },
    ];
  }, [area, street]);
  async function regUser(userInfo: IUserInfo) {
    const response = await UserService.registration(userInfo);
    return response;
  }
  const submitHandler = async () => {
    try {
      if (userData.password === userData.confirmPassword) {
        alert(regUser(userData));
        navigate("/login");
      } else alert("Подтвержденный пароль не совпадает с введённым");
    } catch (error: any) {
      alert(error);
    }
  };
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeInput({ name: event.target.name, value: event.target.value })
    );
  };
  const changeHandlerSelect = (newValue: { name: string; value: string }) => {
    dispatch(changeInput({ name: newValue.name, value: newValue.value }));
  };
  if (error) return <Error errorMessage={error}></Error>;
  if (isLoading) return <Loader />;
  return (
    <div className={styles.containerRegistration}>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                onChange={changeHandlerInput}
                value={userData[input.name as keyof IUserInfo]}
              />
            );
          })}
          {selects.map((select) => {
            return (
              <FormSelect
                key={select.id}
                {...select}
                onChange={changeHandlerSelect}
              />
            );
          })}
          <button className={styles.button}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
