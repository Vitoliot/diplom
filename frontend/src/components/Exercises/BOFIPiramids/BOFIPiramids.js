import React, { useEffect } from "react";
import { useState } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import styles from "./BOFIPiramids.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/mapDispatchToProps";
import { Link } from "react-router-dom";

const BOFIPiramids = ({
  item,
  isLogged,
  usertaskId,
  taskId,
  usercourseId,
  createBOFI,
  createAnswer,
  doneTask,
  createUserTask,
  time,
  isParam,
}) => {
  const [isExplain, setIsExplain] = useState(true);
  const [isExerciseTest, setIsExerciseTest] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [counter, setCounter] = useState(3);
  let [widthOfPanel, setWidthOfPanel] = useState(5);
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [checkValue1, setCheckValue1] = useState(getRandomInt(9));
  let [checkValue2, setCheckValue2] = useState(getRandomInt(9));

  useEffect(() => {
    const countdown =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (isExplain && countdown == 0) {
      setIsExplain(false);
      setCounter(2);
    }
    if (!isExplain && !isExerciseTest && countdown == 0) {
      setIsExerciseTest(true);
      setCounter(2);
    }
    if (isFinal) {
      setIsExplain(false);
      setIsExerciseTest(false);
      setCounter(0);
    }
    return () => clearInterval(countdown);
  }, [counter]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function handleDoneButton(value) {
    if (isLogged) {
      if (!isParam) createUserTask(taskId, usercourseId, time, value);
      createBOFI(value);
    }
    doneTask(value);
  }

  function handleInput1Change(e) {
    setInputValue1(e.target.value);
    inputValue1 = e.target.value;
    console.log("hanlde1", inputValue1, inputValue2);
    if (inputValue1 && inputValue2) checkValues();
  }

  function handleInput2Change(e) {
    setInputValue2(e.target.value);
    inputValue2 = e.target.value;
    console.log("hanlde2", inputValue1, inputValue2);
    if (inputValue1 && inputValue2) checkValues();
  }

  function checkValues() {
    console.log("checkValues");
    if (
      inputValue1 == checkValue1 &&
      inputValue2 == checkValue2 &&
      widthOfPanel < 10
    ) {
      setCheckValue1(getRandomInt(9));
      setCheckValue2(getRandomInt(9));
      setIsExerciseTest(false);
      setCounter(2);
      setInputValue1("");
      setInputValue2("");
      setWidthOfPanel(widthOfPanel + 1);
    } else {
      setIsExerciseTest(false);
      setIsFinal(true);
      handleDoneButton(widthOfPanel * 10);
    }
  }

  return (
    <div styleName={isFinal ? "normalContainer" : "blackContainer"}>
      {isExplain ? (
        <h1>{counter}</h1>
      ) : (
        <div
          style={{ width: widthOfPanel * 38 + "px" }}
          // width={widthOfPanel * 10 + "em"}
          styleName={
            isExerciseTest
              ? "whitePanel"
              : isFinal
              ? widthOfPanel < 10
                ? "redPanel"
                : "greenPanel"
              : "coffeePanel"
          }
        >
          <div styleName="inputDiv">
            {isExerciseTest ? (
              <input value={inputValue1} onChange={handleInput1Change} />
            ) : (
              <h2>{checkValue1}</h2>
            )}
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div styleName="point"></div>
          </div>
          <div styleName="inputDiv">
            {isExerciseTest ? (
              <input value={inputValue2} onChange={handleInput2Change} />
            ) : (
              <h2>{checkValue2}</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps("BOFIPiramids"),
  mapDispatchToProps("BOFIPiramids")
)(CSSModules(BOFIPiramids, styles, { allowMultiple: true }));
