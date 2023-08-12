import styles from "../css/components/Error.module.css";

function Error({ errorMessage }: { errorMessage: string }) {
  return <div className={styles.container}>ERROR : {errorMessage}</div>;
}

export default Error;
