import React from "react";
import { useEffect } from "react";
import styles from "./Exercise.css";
import CSSModules from "react-css-modules";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { connect } from "react-redux";
import Header from "../Header/Header";
import useTimer from "../Exercises/Timer/useTimer";
import Timer from "../Exercises/Timer/Timer";
import ExerciseText from "../Exercises/ExerciseText/ExerciseText";
import Result from "../Exercises/Result/Result";
import TenWords from "../Exercises/TenWords/TenWords";
import CountObjects from "../Exercises/CountObjects/CountObjects";
import BOFIPiramids from "../Exercises/BOFIPiramids/BOFIPiramids";

const Exercise = ({ current_task, getTask, exerciseState, isLogged }) => {
  const [time, isStarted, startTimer, stopTimer, resetTimer] = useTimer(0);
  console.log(current_task, exerciseState, isLogged);
  useEffect(() => {
    if (!isStarted) startTimer();
    if (current_task.isNotTimer) stopTimer();
  });

  return (
    <div>
      <Header
        title={
          exerciseState.isParam
            ? "Определение показателей"
            : current_task.data.title
        }
      />
      <div styleName="exerciseContainer">
        <div
          style={{
            margin: "auto",
            display: "flex",
            gap: "1em",
            "flex-direction": "row",
            "justify-content": "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#ebe2ca",
              "border-radius": "20px",
            }}
          >
            {exerciseState.isParam ? (
              exerciseState.param == "КЭЧ" ? (
                <ExerciseText
                  time={time}
                  QERTest={true}
                  LMTest={false}
                  isParam={true}
                />
              ) : exerciseState.param == "ЛП" ? (
                <ExerciseText
                  time={time}
                  QERTest={false}
                  LMTest={true}
                  isParam={true}
                />
              ) : exerciseState.param == "ВП" ? (
                <TenWords time={time} withPosition={false} isParam={true} />
              ) : exerciseState.param == "ВПСП" ? (
                <TenWords time={time} withPosition={true} isParam={true} />
              ) : exerciseState.param == "ШПЗ" ? (
                <BOFIPiramids time={time} isParam={true} />
              ) : exerciseState.param == "КВ" ? (
                <CountObjects time={time} isParam={true} />
              ) : (
                <h1> Нет задания</h1>
              )
            ) : current_task.data.type == "текстовое задание" ? (
              current_task.data.title == "10 тезисов" ? (
                <ExerciseText
                  time={time}
                  QERTest={false}
                  isParam={false}
                  LMTest={true}
                />
              ) : (
                <ExerciseText
                  time={time}
                  QERTest={true}
                  LMTest={false}
                  isParam={false}
                />
              )
            ) : current_task.data.title == "10 слов" ? (
              <TenWords time={time} withPosition={false} isParam={false} />
            ) : current_task.data.title == "10 слов с позициями" ? (
              <TenWords time={time} withPosition={true} isParam={false} />
            ) : current_task.data.title == "Подсчёт объектов" ? (
              <CountObjects time={time} isParam={false} />
            ) : current_task.data.title == "Определение ШУЗ" ? (
              <BOFIPiramids time={time} isParam={false} />
            ) : (
              <h1>Нет задания</h1>
            )}
          </div>
          <div
            style={{ display: "flex", gap: "1em", "flex-direction": "column" }}
          >
            {current_task.isComplete ? (
              <Result
                correctness={current_task.correctness}
                title={
                  exerciseState.isParam
                    ? exerciseState.param
                    : current_task.data.title
                }
                isParams={exerciseState.isParam}
                isLogged={isLogged}
              ></Result>
            ) : null}
            <Timer time={time}></Timer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(
  mapStateToProps("Exercise"),
  mapDispatchToProps("Exercise")
)(CSSModules(Exercise, styles, { allowMultiple: true }));
