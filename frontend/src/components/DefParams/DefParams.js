import React from "react";
import { Link } from "react-router-dom";
import styles from "./DefParams.css";
import CSSModules from "react-css-modules";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { connect } from "react-redux";
import Header from "../Header/Header";

import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

const DefParams = ({ user_params, new_params, changeExerciseState }) => {
  ChartJS.register(ArcElement);
  console.log(new_params);
  function returnData(value, label) {
    let color = getColor(value);

    console.log(color);
    return {
      labels: [label],
      datasets: [
        {
          label: "%",
          data: [value, 100 - value],
          backgroundColor: [color, "rgba(255, 255, 255, 1)"],
          borderColor: [color, "rgba(255, 255, 255, 1)"],
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  }

  function getColor(corr) {
    if (corr >= 50) {
      if (corr >= 75) {
        return "rgba(154, 197, 99, 1)";
      } else {
        return "rgba(227, 196, 117, 1)";
      }
    } else {
      return "rgba(219, 109, 109, 1)";
    }
  }

  return (
    <div>
      <Header title="Определение показателей" />
      <div styleName="paramsParentContainer">
        <div>
          <div styleName="dataContainer">
            <div>
              <h1> {"КЭЧ"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["QER"]
                      ? new_params["QER"].value
                      : user_params.data["QER"].length
                      ? user_params.data["QER"][0]["value"]
                      : 0,
                    "КЭЧ"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["QER"]
                  ? new_params["QER"].value
                  : user_params.data["QER"].length
                  ? user_params.data["QER"][0]["value"]
                  : 0}
              </span>
            </div>
            <div>
              <h1> {"КУ"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["QER"]
                      ? new_params["QER"].QU
                      : user_params.data["QER"].length
                      ? user_params.data["QER"][0]["QU"]
                      : 0,
                    "КУ"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["QER"]
                  ? new_params["QER"].QU
                  : user_params.data["QER"].length
                  ? user_params.data["QER"][0]["QU"]
                  : 0}
              </span>
            </div>
          </div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Коэффициента Эффективности Чтения"}</h1>
            <span>Внимательно прочтите текст. Далее ответьте на вопросы.</span>
            {new_params["QER"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("КЭЧ")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
        </div>
        <div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Широты Поля Зрения"}</h1>
            <span>Внимательно прочтите текст. Далее ответьте на вопросы.</span>
            {new_params["BOFI"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("ШПЗ")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
          <div styleName="dataContainer">
            <div>
              <h1> {"ШПЗ"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["BOFI"]
                      ? new_params["BOFI"].value
                      : user_params.data["BOFI"].length
                      ? user_params.data["BOFI"][0]["value"]
                      : 0,
                    "ШПЗ"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["BOFI"]
                  ? new_params["BOFI"].value
                  : user_params.data["BOFI"].length
                  ? user_params.data["BOFI"][0]["value"]
                  : 0}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div styleName="dataContainer">
            <div>
              <h1> {"ВП"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["VM"]
                      ? new_params["VM"].value
                      : user_params.data["VM"].length
                      ? user_params.data["VM"][0]["value"]
                      : 0,
                    "ВП"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["VM"]
                  ? new_params["VM"].value
                  : user_params.data["VM"].length
                  ? user_params.data["VM"][0]["value"]
                  : 0}
              </span>
            </div>
          </div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Визуальной Памяти"}</h1>
            <span>
              За 10 секунд постарайтесь запомнить все слова и их номер. Далее
              запишите их в предоставленные поля.
            </span>
            {new_params["VM"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("ВП")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
        </div>
        <div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Логической Памяти"}</h1>
            <span>
              Внимательно прочтите текст. Далее запишите тезисы текста в порядке
              их появления.
            </span>
            {new_params["LM"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("ЛП")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
          <div styleName="dataContainer">
            <div>
              <h1> {"ЛП"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["LM"]
                      ? new_params["LM"].value
                      : user_params.data["LM"].length
                      ? user_params.data["LM"][0]["value"]
                      : 0,
                    "ЛП"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["LM"]
                  ? new_params["LM"].value
                  : user_params.data["LM"].length
                  ? user_params.data["LM"][0]["value"]
                  : 0}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div styleName="dataContainer">
            <div>
              <h1> {"ВПСП"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["VMWP"]
                      ? new_params["VMWP"].value
                      : user_params.data["VMWP"].length
                      ? user_params.data["VMWP"][0]["value"]
                      : 0,
                    "ВПСП"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["VMWP"]
                  ? new_params["VMWP"].value
                  : user_params.data["VMWP"].length
                  ? user_params.data["VMWP"][0]["value"]
                  : 0}
              </span>
            </div>
          </div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Визуальной Памяти с учётом позиции"}</h1>
            <span>
              За 10 секунд постарайтесь запомнить все слова и их позицию. Далее
              запишите их в предоставленные поля.
            </span>
            {new_params["VMWP"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("ВПСП")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
        </div>
        <div>
          <div styleName="paramTaskContainer">
            <h1>{"Определение Коэффициента Внимания"}</h1>
            <span>Внимательно прочтите текст. Далее ответьте на вопросы.</span>
            {new_params["AA"] ? (
              <div>
                <button style={{ background: "#9ac563" }}>{"Готово"}</button>
              </div>
            ) : (
              <Link to="/exercise">
                <button onClick={() => changeExerciseState("КВ")}>
                  {"Приступить"}
                </button>
              </Link>
            )}
          </div>
          <div styleName="dataContainer">
            <div>
              <h1> {"КВ"} </h1>
              <div>
                <Pie
                  data={returnData(
                    new_params["AA"]
                      ? new_params["AA"].value
                      : user_params.data["AA"].length
                      ? user_params.data["AA"][0]["value"]
                      : 0,
                    "КВ"
                  )}
                ></Pie>
              </div>
              <span>
                {new_params["AA"]
                  ? new_params["AA"].value
                  : user_params.data["AA"].length
                  ? user_params.data["AA"][0]["value"]
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("DefParams"),
  mapDispatchToProps("DefParams")
)(CSSModules(DefParams, styles, { allowMultiple: true }));
