import React from "react";
import styles from "./CenterButton.css";
import CSSModules from "react-css-modules";

const CenterButton = ({
  title,
  isPressed,
  handle = () => {},
  focus = () => {},
  image = false,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={handle}
        onFocus={focus}
        styleName="centerButton"
        style={
          isPressed
            ? { "box-shadow": "inset 0px 4px 4px 4px rgba(0, 0, 0, 0.25)" }
            : {}
        }
      >
        {image ? (
          <img src={image} width="30px" height="30px"></img>
        ) : (
          <h3>{title}</h3>
        )}
      </button>
    </div>
  );
};

// export default connect(
//     mapStateToProps("CenterButton"),
//     mapDispatchToProps("CenterButton")
//   )
export default CSSModules(CenterButton, styles, { allowMultiple: true });
