import React from "react";
import styles from "./Result.css";
import CSSModules from "react-css-modules";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip);

const Result = ({ correctness, title, isParams, isLogged }) => {
  console.log(correctness, title, isParams, isLogged);

  let color = "";
  if (correctness >= 50) {
    if (correctness >= 75) {
      color = "rgba(154, 197, 99, 1)";
    } else {
      color = "rgba(227, 196, 117, 1)";
    }
  } else {
    color = "rgba(219, 109, 109, 1)";
  }

  console.log(color)

  const data = {
    labels: ["Правильность"],
    datasets: [
      {
        label: "%",
        data: [correctness, 100 - correctness],
        backgroundColor: [color, "rgba(255, 255, 255, 1)"],
        borderColor: [color, "rgba(255, 255, 255, 1)"],
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div styleName="resultParent">
      <div>
        <h1>{title}</h1>
        <div>
          <Pie data={data}></Pie>
        </div>
        <h1>{correctness + "%"}</h1>
        <Link
          to={isLogged ? (isParams ? "/params" : "/course") : "/"}
          style={{ margin: "auto" }}
        >
          <button>{"Далее"}</button>
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Result, styles, { allowMultiple: true });
