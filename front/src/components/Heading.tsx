import styles from "../css/components/Heading.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Heading({ toggleShow }: { toggleShow: () => void }) {
  const navigate = useNavigate();
  const { isAuth, toggleIsAuth } = useContext(AuthContext);
  const exitHandler = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      localStorage.clear();
      toggleIsAuth(false);
      navigate("/");
    }
  };
  return (
    <div className={styles.head} id="navbar">
      {isAuth && (
        <RxHamburgerMenu className={styles.showBtn} onClick={toggleShow} />
      )}
      <Link to="/" className={styles.btn}>
        Главная
      </Link>
      <Link to="contacts" className={styles.btn}>
        Контакты
      </Link>
      <Link to="registration" className={styles.linkReg}>
        Регистрация
      </Link>
      {isAuth ? (
        <Link to="/" className={styles.btn} onClick={exitHandler}>
          Выход
        </Link>
      ) : (
        <Link className={styles.btn} to="login">
          Вход
        </Link>
      )}
    </div>
  );
}

export default Heading;
