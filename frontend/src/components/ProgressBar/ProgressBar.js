import React, { useState } from "react";
import styles from "./ProgressBar.css";
import CSSModules from "react-css-modules";

const ProgressBar = ({ count_of_complete_tasks, count_of_tasks }) => {
  return (
    <div className="progressBar" styleName="progressBar">
      <div
        className="progress-value"
        styleName="progress-value"
        style={{
          width: (count_of_complete_tasks / count_of_tasks) * 100 + "%",
        }}
      ></div>
    </div>
  );
};

export default CSSModules(ProgressBar, styles, { allowMultiple: true });
