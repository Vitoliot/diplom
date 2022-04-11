import React from "react";
import styles from "./Select.css";
import CSSModules from "react-css-modules";

const Translator = {
  true: "Да",
  false: "Нет",
};

const Select = ({ id, value, values, onChange, title = "" }) => {
  console.log(id, value, values);
  values.unshift("");
  return (
    <div>
      <label 
        styleName="sLabel" for={id}>{title}</label>
      <select
        id={id}
        onChange={(e) => {
          onChange(e.target.selectedIndex);
        }}
        className="selectAttr"
        styleName="selectAttr"
      >
        {values.map((element) =>
          element !== value ? (
            <option id={element + "Option"}>
              {" "}
              {(element === "true") | (element === "false")
                ? Translator[element]
                : element}{" "}
            </option>
          ) : (
            <option id={element + "Option"} selected>
              {(element === "true") | (element === "false")
                ? Translator[element]
                : element}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default CSSModules(Select, styles, { allowMultiple: true });
