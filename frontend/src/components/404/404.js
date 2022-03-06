import React from "react";
import { Link } from "react-router-dom";
import styles from "./404.css";
import CSSModules from "react-css-modules";
import Header from "../Header/Header";

const InvalidRoute = () => (
  <div>
    <Header title="Страница не найдена" />
    <section className="wrapper" styleName="wrapper">
      <div className="contentWrapper" styleName="contentWrapper">
        <img src="../../../static/images/courseCatalog.svg"/>
        <Link to={"/"}>
          <button onClick={() => {}}>
		  {"На главную"}
		  </button>
        </Link>
      </div>
    </section>
  </div>
);

export default CSSModules(InvalidRoute, styles, { allowMultiple: true });
