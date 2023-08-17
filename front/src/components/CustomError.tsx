import styles from "../css/components/Error.module.css";

function CustomError({ errorText }: { errorText: string }) {
  return <div className={styles.container}>ERROR : {errorText}</div>;
}

export default CustomError;
