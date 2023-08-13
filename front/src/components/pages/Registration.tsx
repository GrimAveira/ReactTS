import { ChangeEvent, useEffect, useMemo } from "react";
import styles from "../../css/pages/Registration.module.css";
import { useNavigate } from "react-router-dom";
import FormSelect from "../UI/SelectForm";
import Loader from "../Loader";
import { IData, IUserInfo } from "../../interface";
import UserService from "../../API/UserService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeUserRegData } from "../../store/reducers/UserRegDataSlice";
import Error from "../Error";
import { fetchArea, fetchStreet } from "../../store/reducers/ActionCreators";
import InputFormErrorLabel from "../UI/InputFormLabel";

function Registration() {
  const dispatch = useAppDispatch();

  const areaInfo = useAppSelector((state) => state.areaReducer);
  const streetInfo = useAppSelector((state) => state.streetReducer);
  const userData = useAppSelector((state) => state.userRegDataReducer);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchArea({
        signal: controller.signal,
      })
    );
    dispatch(
      fetchStreet({
        signal: controller.signal,
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch]);
  const inputs = [
    {
      name: "login",
      type: "text",
      placeholder: "Логин",
      title:
        "Логин должен состоять из 3-16 латинских символов и не может включать специальные символы!",
      label: "Логин",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Пароль",
      title:
        "Пароль должен состоять из 8-20 латинских символов и включать как минимум 1 букву, 1 цифру и 1 специальный символ!",
      label: "Пароль",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Подтвердить пароль",
      title: "Пароли не совпадают!",
      label: "Подтвердить пароль",
      pattern: userData.password,
      required: true,
    },
    {
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      title:
        "Фамилия должна состоять из 1-20 символов кириллицы и не может включать специальные символы!",
      label: "Фамилия",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      name: "name",
      type: "text",
      placeholder: "Имя",
      title:
        "Имя должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
      label: "Имя",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      name: "patronymic",
      type: "text",
      placeholder: "Отчество",
      title:
        "Отчетсво должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
      label: "Отчество",
      pattern: "^[А-Я][а-я]{1,20}$",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "number",
      placeholder: "Телефонный номер",
      title: "Мобильный номер должен состоять только из 11 цифр!",
      label: "Телефонный номер",
      pattern: "^[0-9]{11}$",
      required: true,
    },
    {
      name: "house",
      type: "number",
      placeholder: "Номер дома",
      title: "Номер дома должен состоять из 1-5 цифр!",
      label: "Номер дома",
      pattern: "^[0-9]{1,5}$",
      required: true,
    },
    {
      name: "entrance",
      type: "number",
      placeholder: "Номер подъезда",
      title: "Номер подъезда должен состоять из 1-5 цифр!",
      label: "Номер подъезда",
      pattern: "^[0-9]{1,5}$",
      required: true,
    },
    {
      name: "apartment",
      type: "number",
      placeholder: "Номер квартиры",
      title: "Номер квартиры должен состоять из 1-3 цифр!",
      label: "Номер квартиры",
      pattern: "^[0-9]{1,3}$",
      required: true,
    },
  ];
  const selects = useMemo(() => {
    return [
      {
        name: "area",
        placeholder: "Район",
        label: "Район",
        required: true,
        options: areaInfo.area.map((area: IData) => {
          return { value: area.id, label: area.name, name: "area" };
        }),
      },
      {
        name: "street",
        placeholder: "Улица",
        label: "Улица",
        required: true,
        options: streetInfo.street.map((street: IData) => {
          return { value: street.id, label: street.name, name: "street" };
        }),
      },
    ];
  }, [areaInfo.area, streetInfo.street]);
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
  const changeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeUserRegData({ name: event.target.name, value: event.target.value })
    );
  };
  const changeHandlerSelect = (newValue: { name: string; value: string }) => {
    dispatch(changeUserRegData({ name: newValue.name, value: newValue.value }));
  };
  if (areaInfo.error || streetInfo.error)
    return <Error errorText={`${areaInfo.error || streetInfo.error}`}></Error>;
  if (areaInfo.isLoading || streetInfo.isLoading) return <Loader />;
  return (
    <div className={styles.containerRegistration}>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          {inputs.map((input) => {
            return (
              <InputFormErrorLabel
                onChange={changeHandlerInput}
                value={userData[input.name as keyof IUserInfo]}
                {...input}
              />
            );
          })}
          {selects.map((select) => {
            return (
              <FormSelect
                key={select.name}
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
