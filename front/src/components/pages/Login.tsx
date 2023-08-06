// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../css/pages/Login.module.css";
// import FormInput from "../UI/FormInput";
// import { AuthContext } from "../../context/AuthContext";

// function Login() {
//   const [isAuth, setIsAuth] = useContext(AuthContext);
//   const [loginData, setLoginData] = useState({
//     login: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const changeHandler = (event: eve) => {
//     setLoginData((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };
//   const submitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       axios
//         .post("http://localhost:8800/api/auth/login", loginData)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("role", response.data.role);
//           setIsAuth(true);
//           navigate("/applications");
//         })
//         .catch((error) => alert(error.response.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const inputs = [
//     {
//       id: 1,
//       type: "text",
//       name: "login",
//       placeholder: "Логин",
//       label: "Логин",
//       required: true,
//     },
//     {
//       id: 2,
//       type: "password",
//       name: "password",
//       label: "Пароль",
//       placeholder: "Пароль",
//       required: true,
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       <form onSubmit={submitHandler} className={styles.form}>
//         {inputs.map((input) => {
//           return (
//             <FormInput
//               key={input.id}
//               {...input}
//               value={loginData[input.name]}
//               onChange={changeHandler}
//             />
//           );
//         })}
//         <button className={styles.button}>Войти</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
