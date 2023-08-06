// import { useEffect, useMemo, useReducer } from "react";
// import styles from "../../css/pages/Registration.module.css";
// import FormInput from "../UI/FormInput";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import FormSelect from "../UI/FormSelect";
// import {
//   INITIAL_REG_VALUES,
//   regValueReducer,
// } from "../../reducers/regValuesReducer";
// import AreaService from "../../API/AreaService";
// import StreetService from "../../API/StreetService";
// import Loader from "../Loader";
// import { IRegValues } from "../../interface";
// import { INITIAL_DATA, regFetch } from "../../reducers/regFetchReducer";

// function Registration() {
//   const navigate = useNavigate();
//   const [data, dispatchData] = useReducer(regFetch, INITIAL_DATA);
//   const [regValues, dispatchRegValues] = useReducer(
//     regValueReducer,
//     INITIAL_REG_VALUES
//   );
//   useEffect(() => {
//     const controller = new AbortController();

//     async function area(): Promise<void> {
//       try {
//         const areaResponse = await AreaService.getAll({
//           signal: controller.signal,
//         });
//         dispatchData({ type: "FETCH_AREA", payload: areaResponse.data });
//       } catch (error: any) {
//         dispatchData({ type: "FETCH_ERROR", payload: error.message });
//       }
//     }
//     async function street() {
//       try {
//         const streetResponse = await StreetService.getAll({
//           signal: controller.signal,
//         });
//         dispatchData({ type: "FETCH_STREET", payload: streetResponse.data });
//       } catch (err: any) {
//         dispatchData({ type: "FETCH_ERROR", payload: err.message });
//       }
//     }
//     try {
//       area();
//       street();
//     } catch (error: any) {
//       console.log(error.message);
//     } finally {
//       dispatchData({
//         type: "FETCH_SUCCESS",
//       });
//     }
//     return () => {
//       controller.abort();
//     };
//   }, []);
//   const inputs = [
//     {
//       id: 1,
//       name: "login",
//       type: "text",
//       placeholder: "Логин",
//       errorMessage:
//         "Логин должен состоять из 3-16 латинских символов и не может включать специальные символы!",
//       label: "Логин",
//       pattern: "^[A-Za-z0-9]{3,16}$",
//       required: true,
//     },
//     {
//       id: 2,
//       name: "password",
//       type: "password",
//       placeholder: "Пароль",
//       errorMessage:
//         "Пароль должен состоять из 8-20 латинских символов и включать как минимум 1 букву, 1 цифру и 1 специальный символ!",
//       label: "Пароль",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//     {
//       id: 3,
//       name: "confirmPassword",
//       type: "password",
//       placeholder: "Подтвердить пароль",
//       errorMessage: "Пароли не совпадают!",
//       label: "Подтвердить пароль",
//       pattern: regValues.password,
//       required: true,
//     },
//     {
//       id: 4,
//       name: "surname",
//       type: "text",
//       placeholder: "Фамилия",
//       errorMessage:
//         "Фамилия должна состоять из 1-20 символов кириллицы и не может включать специальные символы!",
//       label: "Фамилия",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 5,
//       name: "name",
//       type: "text",
//       placeholder: "Имя",
//       errorMessage:
//         "Имя должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
//       label: "Имя",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 6,
//       name: "patronymic",
//       type: "text",
//       placeholder: "Отчество",
//       errorMessage:
//         "Отчетсво должно состоять из 1-20 символов кириллицы и не должно содержать никаких специальных символов!",
//       label: "Отчество",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 7,
//       name: "phoneNumber",
//       type: "number",
//       placeholder: "Телефонный номер",
//       errorMessage: "Мобильный номер должен состоять только из 11 цифр!",
//       label: "Телефонный номер",
//       pattern: "^[0-9]{11}$",
//       required: true,
//     },
//     {
//       id: 8,
//       name: "house",
//       type: "number",
//       placeholder: "Номер дома",
//       errorMessage: "Номер дома должен состоять из 1-5 цифр!",
//       label: "Номер дома",
//       pattern: "^[0-9]{1,5}$",
//       required: true,
//     },
//     {
//       id: 9,
//       name: "entrance",
//       type: "number",
//       placeholder: "Номер подъезда",
//       errorMessage: "Номер подъезда должен состоять из 1-5 цифр!",
//       label: "Номер подъезда",
//       pattern: "^[0-9]{1,5}$",
//       required: true,
//     },
//     {
//       id: 10,
//       name: "apartment",
//       type: "number",
//       placeholder: "Номер квартиры",
//       errorMessage: "Номер квартиры должен состоять из 1-3 цифр!",
//       label: "Номер квартиры",
//       pattern: "^[0-9]{1,3}$",
//       required: true,
//     },
//   ];
//   const selects = useMemo(() => {
//     return [
//       {
//         id: 1,
//         name: "area",
//         placeholder: "Район",
//         label: "Район",
//         required: true,
//         options: data.area.map((area: { id: string; name: string }) => {
//           return { value: area.id, label: area.name, name: "area" };
//         }),
//       },
//       {
//         id: 2,
//         name: "street",
//         placeholder: "Улица",
//         label: "Улица",
//         required: true,
//         options: data.street.map((street: { id: string; name: string }) => {
//           return { value: street.id, label: street.name, name: "street" };
//         }),
//       },
//     ];
//   }, [data.area, data.street]);
//   const submitHandler = async (event: { preventDefault: () => void }) => {
//     event.preventDefault();
//     try {
//       if (regValues.password === regValues.confirmPassword)
//         await axios
//           .post("http://localhost:8800/api/auth/registration", regValues)
//           .then((response) => {
//             alert(response.data);
//             navigate("/login");
//           })
//           .catch((err) => {
//             alert(err.response.data);
//           });
//       else alert("Подтвержденный пароль не совпадает с введённым");
//     } catch (error) {
//       alert(error);
//     }
//   };
//   const changeHandlerInput = (event: {
//     target: { name: string; value: string };
//   }) => {
//     dispatchRegValues({
//       type: "CHANGE_VALUE",
//       payload: {
//         name: event.target.name,
//         value: event.target.value,
//       },
//     });
//   };
//   const changeHandlerSelect = (newValue: { name: string; value: string }) => {
//     dispatchRegValues({
//       type: "CHANGE_VALUE",
//       payload: {
//         name: newValue.name,
//         value: newValue.value,
//       },
//     });
//   };

//   if (data.error.status)
//     return (
//       <div
//         style={{
//           marginTop: 30,
//           marginLeft: "auto",
//           marginRight: "auto",
//           textAlign: "center",
//           width: 200,
//           fontSize: 30,
//           border: "solid",
//         }}
//       >
//         ERROR : {data.error.message}
//       </div>
//     );
//   return (
//     <div className={styles.containerRegistration}>
//       {data.loading ? (
//         <Loader />
//       ) : (
//         <div className={styles.form}>
//           <form onSubmit={submitHandler}>
//             {inputs.map((input) => {
//               return (
//                 <FormInput
//                   key={input.id}
//                   {...input}
//                   onChange={changeHandlerInput}
//                   value={regValues[input.name as keyof IRegValues]}
//                 />
//               );
//             })}
//             {selects.map((select) => {
//               return (
//                 <FormSelect
//                   key={select.id}
//                   {...select}
//                   onChange={changeHandlerSelect}
//                 />
//               );
//             })}
//             <button className={styles.button}>Зарегистрироваться</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Registration;
export {};
