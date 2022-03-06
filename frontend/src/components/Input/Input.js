import React, { useEffect, useState } from "react";
import styles from "./Input.css";
import CSSModules from "react-css-modules";

const Input = ({
  id,
  label,
  isEmpty,
  value,
  error = "",
  onChange,
  onFocus = () => {},
  readonly = false,
  password = false,
}) => {
  let [hideSymbols, setHideSymbols] = useState(password);

  function handlePasswordToText() {
    setHideSymbols(false);
  }

  function handleTextToPassword() {
    setHideSymbols(true);
  }
  return (
    <div className="inputField" styleName="inputField">
      <div>
        <label className="labelInput" styleName="labelInput" htmlFor={id}>
          {label}
        </label>
        <input
          className={
            password
              ? "passwordInput"
              : readonly
              ? "readonlyInput"
              : "defaultInput"
          }
          styleName={
            password
              ? "passwordInput"
              : readonly
              ? "readonlyInput"
              : "defaultInput"
          }
          id={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          readOnly={readonly}
          type={hideSymbols ? "password" : "text"}
        />
        {password ? (
          <div
            className="imgInput"
            styleName="imgInput"
            onMouseEnter={handlePasswordToText}
            onMouseLeave={handleTextToPassword}
          >
            <img src="../../../static/images/show_password.svg"></img>
          </div>
        ) : null}
      </div>
      <span className="inputError" styleName="inputError">
        {error}
      </span>
    </div>
  );
};

export default CSSModules(Input, styles, { allowMultiple: true });
