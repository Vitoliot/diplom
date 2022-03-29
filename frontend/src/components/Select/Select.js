import React from "react";
import styles from "./Select.css";
import CSSModules from "react-css-modules";

const Select = ({id, value, values, onChange}) => {
    console.log(id, value, values)
  return (
    <div>
      <label for={id} />
      <select id={id} onChange={onChange} className="selectAttr" styleName="selectAttr">
        {values.map((element) =>
          element !== value ? (
            <option id={element.charAt(0) + "Option"}> {element} </option>
          ) : (
            <option id={element.charAt(0) + "Option"} selected>
              {element}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default CSSModules(Select, styles, { allowMultiple: true });
