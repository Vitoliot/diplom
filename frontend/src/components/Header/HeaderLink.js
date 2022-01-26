import React from "react";
import styles from "./HeaderLink.css";
import CSSModules from "react-css-modules";

const HeaderLink = (props) => {
  return (
    <div className="linkContainer" styleName="linkContainer">
      <img src={props.imgPath} styleName="linkImage" width={50} height={50}/>
      <h3 styleName="linkTitle">{props.title}</h3>
    </div>
  );
};

export default CSSModules(HeaderLink, styles, { allowMultiple: true });
