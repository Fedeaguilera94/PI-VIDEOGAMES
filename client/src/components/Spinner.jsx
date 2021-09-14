import logo from "../img/Neon-Loading.gif";
import styles from "./Spinner.module.css";
export default function Spinner() {
  return (
    <div className={styles.conteiner}>
      <p>Loading</p>
      <img src={logo} alt="Loading..." />
    </div>
  );
}
