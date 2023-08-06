import { useEffect } from "react";
import axios from "axios";
import styles from "../../css/components/inputAdds/EmployeeForm.module.css";
import { useState } from "react";
import AddInputForm from "./AddInputForm";
import FormSelect from "../UI/FormSelectAppMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    patronymic: "",
    post: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/get/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setPosts(response.data))
      .catch((err) => alert(err.response.data));
  }, []);
  const changeHandlerInput = (event: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    event.preventDefault();
    setEmployee((emp) => ({
      ...emp,
      [event.target.name]: event.target.value,
    }));
  };
  const changeHandlerSelect = (newValue: { name: string; value: string }) => {
    setEmployee((prev) => ({
      ...prev,
      [newValue.name]: newValue.value,
    }));
  };
  const submitHandler = () => {
    if (window.confirm("Вы действительно хотите внести изменения?"))
      axios
        .post("http://localhost:8800/api/post/employee", employee, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => alert(resp.data))
        .catch((err) => alert(err.response.data));
  };

  const inputs = [
    {
      id: 1,
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      errorMessage:
        "Фамилия должна состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: `^[А-Яа-я]{3,16}$`,
      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Имя",
      errorMessage:
        "Фамилия должно состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: "^[А-Яа-я]{3,16}$",
      required: true,
    },

    {
      id: 3,
      name: "patronymic",
      type: "text",
      placeholder: "Отчество",
      errorMessage:
        "Отчество должно состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: "^[А-Яа-я]{3,16}$",
      required: true,
    },
  ];

  const selects = [
    {
      id: 1,
      name: "post",
      placeholder: "Должности",
      label: "Должонсти",
      required: true,
      options: posts.map((post: { id: string; name: string }) => {
        return { value: post.id, label: post.name, name: "post" };
      }),
    },
  ];

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {inputs.map((inp) => (
        <AddInputForm key={inp.id} onChange={changeHandlerInput} {...inp} />
      ))}
      {selects.map((sel) => (
        <FormSelect key={sel.id} onChange={changeHandlerSelect} {...sel} />
      ))}
      <MyButtonDataBase />
    </form>
  );
}

export default EmployeeForm;
