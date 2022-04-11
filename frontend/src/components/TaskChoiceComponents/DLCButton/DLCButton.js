import React from "react";
import styles from "./DLCButton.css";
import CSSModules from "react-css-modules";

const DLCButton = ({
  title,
  overview,
  isPressed,
  handle = () => {
    isPressed = !isPressed;
  },
  focus = () => {},
}) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => {
          handle(!isPressed);
        }}
        onFocus={focus}
        styleName="dlcButton"
        style={
          isPressed
            ? {
                "box-shadow": "inset 0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
                "background-color": "#9AC563",
              }
            : {}
        }
      >
        <h2
          style={
            isPressed
              ? {
                  color: "white",
                }
              : {}
          }
        >
          {title}
        </h2>
        <h3
          style={
            isPressed
              ? {
                  color: "white",
                }
              : {}
          }
        >
          {overview}
        </h3>
      </button>
    </div>
  );
};

// export default connect(
//     mapStateToProps("DLCButton"),
//     mapDispatchToProps("DLCButton")
//   )
export default CSSModules(DLCButton, styles, { allowMultiple: true });
