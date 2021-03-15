import React from "react";
import styles from "./home.module.scss";
export interface IHome {}
type Props = IHome;
const Home = (props: Readonly<Props>) => {
  return <div className={styles["home-page"]}>1</div>;
};
export default Home;
