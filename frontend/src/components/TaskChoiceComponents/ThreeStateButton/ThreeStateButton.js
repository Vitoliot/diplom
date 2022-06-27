import React from "react";
import styles from "./ThreeStateButton.css";
import CSSModules from "react-css-modules";

const ThreeStateButton = ({
  paramsPressState,
  handlersParamButton = [],
  onMouseEnter,
  onMouseLeave,
  focus = () => {},
}) => {
  const PB = CSSModules(ParamButton, styles, { allowMultiple: true });
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex",
        "flex-direction": "row",
        "flex-wrap": "wrap",
        gap: "1em",
        "max-height": "235px",
        "max-width": "167px",
      }}
    >
      {paramsPressState.map((paramState, index) => {
        return (
          <PB
            title={paramState.title}
            isPressed={paramState.isPressed}
            handle={handlersParamButton[index]}
            focus={focus}
          />
        );
      })}
    </div>
  );
};

const ParamButton = ({ title, isPressed, handle, focus }) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => {
          if (isPressed == "true") handle("false");
          if (isPressed == "false") handle("");
          if (!isPressed) handle("true");
        }}
        onFocus={focus}
        styleName="paramButton"
        style={
          isPressed == "true"
            ? {
                "box-shadow": "inset 0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
                "background-color": "#9AC563",
                color: "white",
              }
            : isPressed == "false"
            ? {
                "box-shadow": "inset 0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
                "background-color": "#DB6D6D",
                color: "white",
              }
            : {}
        }
      >
        <h2
          style={
            !isPressed
              ? {
                  color: "black",
                }
              : {}
          }
        >
          {title}
        </h2>
      </button>
    </div>
  );
};

// export default connect(
//     mapStateToProps("ThreeStateButton"),
//     mapDispatchToProps("ThreeStateButton")
//   )
export default ThreeStateButton;
