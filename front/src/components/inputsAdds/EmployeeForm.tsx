import { useEffect } from "react";
import styles from "../../css/components/inputAdds/EmployeeForm.module.css";
import AddInputForm from "../UI/AddInputForm";
import FormSelect from "../UI/SelectFormMulti";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addEmployee, fetchPosts } from "../../store/reducers/ActionCreators";
import {
  changeEmployeeForm,
  clearEmployee,
} from "../../store/reducers/EmployeeFormSlice";
import { IData, IEmployeePost, IInputChanges } from "../../interface";
import Loader from "../Loader";
import CustomError from "../CustomError";

function EmployeeForm() {
  const dispatch = useAppDispatch();
  const { employee, error, posts, postsIsLoading } = useAppSelector(
    (state) => state.employeeFormReducer
  );
  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchPosts({
        signal: controller.signal,
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);
  const changeHandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      changeEmployeeForm({ name: event.target.name, value: event.target.value })
    );
  };
  const changeHandlerSelect = (newValue: IInputChanges) => {
    dispatch(
      changeEmployeeForm({ name: newValue.name, value: newValue.value })
    );
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearEmployee());
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addEmployee({
          data: { employee },
          token: localStorage.getItem("token"),
        })
      );
  };
  const inputs = [
    {
      name: "surname",
      type: "text",
      placeholder: "Фамилия",
      title:
        "Фамилия должна состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: `^[А-Яа-я]{3,16}$`,
      required: true,
    },
    {
      name: "name",
      type: "text",
      placeholder: "Имя",
      title:
        "Фамилия должно состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: "^[А-Яа-я]{3,16}$",
      required: true,
    },

    {
      name: "patronymic",
      type: "text",
      placeholder: "Отчество",
      title:
        "Отчество должно состоять из 3-16 символов кириллицы и не может включать специальные символы и цифры!",
      pattern: "^[А-Яа-я]{3,16}$",
      required: true,
    },
  ];
  console.log(posts);
  const select = {
    name: "post",
    placeholder: "Должности",
    label: "Должонсти",
    required: true,
    options: posts.map((post: IData) => {
      return { value: post.id, label: post.name, name: "post" };
    }),
  };
  if (postsIsLoading) return <Loader />;
  if (error) return <CustomError errorText={error} />;
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {inputs.map((inp) => (
        <AddInputForm
          key={inp.name}
          onChange={changeHandlerInput}
          {...inp}
          value={employee[inp.name as keyof IEmployeePost]}
        />
      ))}
      <FormSelect onChange={changeHandlerSelect} {...select} />
      <MyButtonDataBase />
    </form>
  );
}

export default EmployeeForm;
