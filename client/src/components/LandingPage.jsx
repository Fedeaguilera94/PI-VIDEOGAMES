import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.backwelcome}>
      <div className={styles.circle}>
        <p>Video Games App</p>
        <Link to="/home">
          <button className={styles.bn30}>Enter</button>
        </Link>
        <p>Welcome</p>
      </div>
    </div>
  );
}
