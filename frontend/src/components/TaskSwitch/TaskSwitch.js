import React from "react";
import CSSModules from "react-css-modules";
import styles from "./TaskSwitch.css";

const TaskSwitch = (props) => {
  if (props.isTheme)
    return (
      <div class="switchContainer" styleName="switchContainer">
        <h3 styleName="switchText">тип</h3>
        <label class="switch" styleName="switch">
          <input
            type="checkbox"
            onClick={(e) => {
              props.onClick(e);
            }}
            checked
          />
          <span class="slider round" styleName="slider round"></span>
        </label>
        <h3 styleName="switchText">тема</h3>
      </div>
    );
  else
  return (
    <div class="switchContainer" styleName="switchContainer">
      <h3 styleName="switchText">тип</h3>
      <label class="switch" styleName="switch">
        <input
          type="checkbox"
          onClick={(e) => {
            props.onClick(e);
          }}
        />
        <span class="slider round" styleName="slider round"></span>
      </label>
      <h3 styleName="switchText">тема</h3>
    </div>
  );
};

export default CSSModules(TaskSwitch, styles, { allowMultiple: true });
