import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../css/pages/Login.module.css";
import FormInput from "../UI/FormInput";
import { AuthContext } from "../../context/AuthContext";
import UserService from "../../API/UserService";

function Login() {
  const { toggleIsAuth } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeHandler = (event: { target: { name: any; value: any } }) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  async function login(loginData: { login: string; password: string }) {
    const userData = await UserService.login(loginData);
    return userData;
  }
  const submitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const userData = await login(loginData);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userData.role);
      toggleIsAuth(true);
      navigate("/applications");
    } catch (error) {
      console.log(error);
    }
  };
  const inputs = [
    {
      id: 1,
      type: "text",
      name: "login",
      placeholder: "Логин",
      label: "Логин",
      required: true,
    },
    {
      id: 2,
      type: "password",
      name: "password",
      label: "Пароль",
      placeholder: "Пароль",
      required: true,
    },
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              value={loginData[input.name as keyof typeof loginData]}
              onChange={changeHandler}
            />
          );
        })}
        <button className={styles.button}>Войти</button>
      </form>
    </div>
  );
}

export default Login;
