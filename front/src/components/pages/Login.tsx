import { useNavigate } from "react-router-dom";
import styles from "../../css/pages/Login.module.css";
import UserService from "../../API/UserService";
import { changeLoginData } from "../../store/reducers/LoginDataSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeIsAuth } from "../../store/reducers/AuthSlice";
import InputForm from "../UI/InputForm";

function Login() {
  const dispatch = useAppDispatch();

  const loginData = useAppSelector((state) => state.loginDataReducer);
  console.log(loginData);
  const navigate = useNavigate();

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    dispatch(
      changeLoginData({ name: event.target.name, value: event.target.value })
    );
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
      dispatch(changeIsAuth(true));
      navigate("/applications");
    } catch (error) {
      console.log(error);
    }
  };
  const inputs = [
    {
      type: "text",
      name: "login",
      placeholder: "Логин",
      label: "Логин",
      required: true,
    },
    {
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
            <InputForm
              {...input}
              key={input.name}
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
