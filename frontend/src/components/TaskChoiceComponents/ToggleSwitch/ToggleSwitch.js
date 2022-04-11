import React from "react";
import CSSModules from "react-css-modules";
import styles from "./ToggleSwitch.css";

const ToggleSwitch = ({
  isPressed,
  handle = () => {
    isPressed = !isPressed;
  },
}) => {
  return (
    <div class="switchContainer" styleName="switchContainer">
      <label class="switch" styleName="switch">
        <input
          type="checkbox"
          onClick={(e) => {
            handle(!isPressed);
          }}
          checked={isPressed}
        />
        <span class="slider round" styleName="slider round">
          <div
            style={{
              transform: "rotate(90deg)",
              display: "flex",
              "flex-direction": "column",
              "margin-left": "auto",
              "margin-right": "auto",
              "margin-top": "-1em",
              "margin-bottom": "auto",
              'gap': '1.5em',
              width: "min-content",
            }}
          >
            <h5 style={isPressed ? { color: "#ebe2ca" } : {}}>С</h5>
            <h5 styleName="impH5" style={!isPressed ? { color: "#ebe2ca" } : {}}>
              П
            </h5>
          </div>
        </span>
      </label>
    </div>
  );
};

export default CSSModules(ToggleSwitch, styles, { allowMultiple: true });
