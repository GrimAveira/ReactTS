import styles from "../../css/components/UI/MyButtonDataBase.module.css";
import { BsDatabaseFillAdd } from "react-icons/bs";

function MyButtonDataBase() {
  return (
    <button className={styles.button} type={"submit"}>
      <BsDatabaseFillAdd style={{ width: "30px", height: "30px" }} />
    </button>
  );
}

export default MyButtonDataBase;
