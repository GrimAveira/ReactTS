import React from "react";
import AddInputForm from "../UI/AddInputForm";
import styles from "../../css/components/inputAdds/PostForm.module.css";
import { useState } from "react";
import MyButtonDataBase from "../UI/MyButtonDataBase";
import { useAppDispatch } from "../../hooks/redux";
import { addPost } from "../../store/reducers/ActionCreators";

function PostForm() {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPost(event.target.value);
  };
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm("Вы действительно хотите внести изменения?"))
      dispatch(
        addPost({ data: { post }, token: localStorage.getItem("token") })
      );
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <AddInputForm
        name="post"
        type="text"
        placeholder="Профессия"
        title="Название профессии должно состоять из 3-30 символов!"
        pattern="^[А-яа-я0-9- ]{3,30}$"
        required={true}
        onChange={changeHandler}
      />
      <MyButtonDataBase />
    </form>
  );
}

export default PostForm;
