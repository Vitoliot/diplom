import React from "react";
import styles from "./ToggleButtons.css";
import CSSModules from "react-css-modules";

const ToggleButtons = ({
  togglePressedState,
  handle = () => {},
  focus = () => {},
}) => {
  const TGB = CSSModules(ToggleButton, styles, { allowMultiple: true });

  return (
    <div style={{ display: "flex" }}>
      {togglePressedState.map((toggleState, index) => {
        return (
          <TGB
            title={toggleState.title}
            isPressed={toggleState.isPressed}
            handle={handle}
            focus={focus}
            index={index}
            length={togglePressedState.length}
          />
        );
      })}
    </div>
  );
};

const ToggleButton = ({ title, isPressed, handle, focus, index, length }) => {
  return (
    <button
      onClick={() => handle(index)}
      onFocus={focus}
      styleName={
        index === length-1
          ? "rightToggleButton"
          : index === 0
          ? "leftToggleButton"
          : "toggleButton"
      }
      style={
        isPressed
          ? {
              "background-color": "#908373",
            }
          : {}
      }
    >
      <h2
        style={
          isPressed
            ? {
                color: "#ebe2ca",
              }
            : { color: "#908373" }
        }
      >
        {title}
      </h2>
    </button>
  );
};

// export default connect(
//     mapStateToProps("ToggleButtons"),
//     mapDispatchToProps("ToggleButtons")
//   )
export default ToggleButtons;
