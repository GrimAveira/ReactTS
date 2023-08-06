// import React from "react";
// import { useState, useEffect } from "react";
// import styles from "../../css/pages/PersonalAccaunt.module.css";
// import axios from "axios";
// import FormInput from "../UI/FormInput";
// import FormSelect from "../UI/FormSelect";

// function PersonalAccaunt() {
//   const [userValues, setUserValues] = useState({
//     login: "",
//     password: "",
//     surname: "",
//     name: "",
//     patronymic: "",
//     phoneNumber: "",
//     area: "",
//     street: "",
//     house: "",
//     entrance: "",
//     apartment: "",
//   });
//   const [areas, setAreas] = useState([]);
//   const [streets, setStreets] = useState([]);
//   const [addressId, setAddressId] = useState("1");

//   useEffect(() => {
//     const controller = new AbortController();
//     try {
//       axios
//         .get("http://localhost:8800/api/get/area", {
//           signal: controller.signal,
//         })
//         .then((response) => {
//           setAreas(response.data);
//         })
//         .catch((err) => console.log(err));
//       axios
//         .get("http://localhost:8800/api/get/street", {
//           signal: controller.signal,
//         })
//         .then((response) => {
//           setStreets(response.data);
//         });
//       axios
//         .get("http://localhost:8800/api/get/user", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           signal: controller.signal,
//         })
//         .then((response) => {
//           setAddressId(response.data[0].address);
//           setUserValues((value) => ({
//             ...value,
//             login: response.data[0].login,
//             surname: response.data[0].surname,
//             name: response.data[0].name,
//             patronymic: response.data[0].patronymic,
//             phoneNumber: response.data[0].phone_number,
//             apartment: response.data[0].apartment,
//           }));
//         })
//         .catch((err) => console.log(err.message));
//     } catch (error) {
//       console.log(error);
//     }
//     return () => {
//       controller.abort();
//     };
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();
//     axios
//       .get("http://localhost:8800/api/get/addressNumber", {
//         params: { address: addressId },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         signal: controller.signal,
//       })
//       .then((response) => {
//         setUserValues((value) => ({
//           ...value,
//           area: response.data[0].area,
//           street: response.data[0].street,
//           house: response.data[0].house,
//           entrance: response.data[0].entrance,
//         }));
//       });
//     return () => {
//       controller.abort();
//     };
//   }, [addressId]);

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     if (window.confirm("Вы действительно хотите внести изменения?"))
//       try {
//         await axios
//           .post("http://localhost:8800/api/post/updateUser", userValues, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           })
//           .then((response) => alert(response.data))
//           .catch((err) => alert(err.response.data));
//       } catch (error) {
//         alert(error);
//       }
//   };
//   const changeHandlerInput = (event) => {
//     setUserValues((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };
//   const changeHandlerSelect = (newValue) => {
//     setUserValues((prev) => ({
//       ...prev,
//       [newValue.name]: newValue.value,
//     }));
//   };

//   const inputs = [
//     {
//       id: 1,
//       name: "login",
//       type: "text",
//       placeholder: "Логин",
//       errorMessage:
//         "Логин должен состоять из 3-16 символов и не может включать специальные символы!",
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
//         "Пароль должен состоять из 8-20 символов и включать как минимум 1 букву, 1 цифру и 1 специальный символ!",
//       label: "Пароль",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//     {
//       id: 3,
//       name: "surname",
//       type: "text",
//       placeholder: "Фамилия",
//       errorMessage:
//         "Фамилия должна состоять из 1-20 символов и не может включать специальные символы!",
//       label: "Фамилия",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 4,
//       name: "name",
//       type: "text",
//       placeholder: "Имя",
//       errorMessage:
//         "Имя должно состоять из 1-20 символов и не должно содержать никаких специальных символов!",
//       label: "Имя",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 5,
//       name: "patronymic",
//       type: "text",
//       placeholder: "Отчество",
//       errorMessage:
//         "Отчетсво должно состоять из 1-20 символов и не должно содержать никаких специальных символов!",
//       label: "Отчество",
//       pattern: "^[А-Я][а-я]{1,20}$",
//       required: true,
//     },
//     {
//       id: 6,
//       name: "phoneNumber",
//       type: "number",
//       placeholder: "Телефонный номер",
//       errorMessage: "Мобильный номер должен состоять только из 11 цифр!",
//       label: "Телефонный номер",
//       pattern: "^[0-9]{11}$",
//       required: true,
//     },
//     {
//       id: 7,
//       name: "house",
//       type: "number",
//       placeholder: "Номер дома",
//       errorMessage: "Номер дома должен состоять из 1-5 цифр!",
//       label: "Номер дома",
//       pattern: "^[0-9]{1,5}$",
//       required: true,
//     },
//     {
//       id: 8,
//       name: "entrance",
//       type: "number",
//       placeholder: "Номер подъезда",
//       errorMessage: "Номер подъезда должен состоять из 1-5 цифр!",
//       label: "Номер подъезда",
//       pattern: "^[0-9]{1,5}$",
//       required: true,
//     },
//     {
//       id: 9,
//       name: "apartment",
//       type: "number",
//       placeholder: "Номер квартиры",
//       errorMessage: "Номер квартиры должен состоять из 1-3 цифр!",
//       label: "Номер квартиры",
//       pattern: "^[0-9]{1,3}$",
//       required: true,
//     },
//   ];
//   const selects = [
//     {
//       id: 1,
//       name: "area",
//       placeholder: "Район",
//       label: "Район",
//       required: true,
//       options: areas.map((area) => {
//         return { value: area.id, label: area.name, name: "area" };
//       }),
//     },
//     {
//       id: 2,
//       name: "street",
//       placeholder: "Улица",
//       label: "Улица",
//       required: true,
//       options: streets.map((street) => {
//         return { value: street.id, label: street.name, name: "street" };
//       }),
//     },
//   ];

//   return (
//     <div className={styles.containerRegistration}>
//       <div className={styles.form}>
//         <form onSubmit={submitHandler}>
//           {inputs.map((input) => {
//             return (
//               <FormInput
//                 key={input.id}
//                 {...input}
//                 value={userValues[input.name]}
//                 onChange={changeHandlerInput}
//               />
//             );
//           })}
//           {selects.map((select) => {
//             return (
//               <FormSelect
//                 key={select.id}
//                 {...select}
//                 onChange={changeHandlerSelect}
//               />
//             );
//           })}
//           <button className={styles.button}>Обновить данные</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PersonalAccaunt;
export {};
