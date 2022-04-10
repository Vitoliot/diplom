import React, { useEffect } from "react";
import { useState } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import styles from "./CountObjects.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/mapDispatchToProps";
import Input from "../../Input/Input";
import { Link } from "react-router-dom";

const CountObjects = ({
  item,
  isLogged,
  usertaskId,
  taskId,
  usercourseId,
  createAA,
  createAnswer,
  doneTask,
  createUserTask,
  time,
  isParam,
}) => {
  const [isSeeWords, setIsSeeWords] = useState(false);
  const [isExplain, setIsExplain] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [counter, setCounter] = useState(3);
  const [amountOfObj, setAmountOfObj] = useState(30);
  const [userAmountOfObj, setUserAmountOfObj] = useState(0);

  useEffect(() => {
    const countdown =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (isExplain && countdown == 0) {
      setIsExplain(false);
      setIsSeeWords(true);
      setCounter(10);
    }
    if (!isExplain && isSeeWords && countdown == 0) {
      setIsSeeWords(false);
    }
    return () => clearInterval(countdown);
  }, [counter]);

  function checkAnswers() {
    let correctness = 0;
    correctness = (userAmountOfObj / amountOfObj) * 100;
    return Math.ceil(correctness);
  }

  function handleUserAmountOfObj(e) {
    setUserAmountOfObj(e.target.value);
  }

  function handleDoneButton() {
    let correctness = 0;
    correctness = checkAnswers();
    if (isLogged) {
      if (!isParam) createUserTask(taskId, usercourseId, time, correctness);
      createAA(correctness);
    }
    doneTask(correctness);
    setIsSeeWords(true);
    setIsFinal(true);
  }

  return (
    <div className="countObjectsParent" styleName="countObjectsParent">
      <div>
        <div>
          <div
            className="countObjectsContainer"
            styleName="countObjectsContainer"
          >
            {isExplain ? (
              <div className="explainContainer" styleName="explainContainer">
                <h1>{counter}</h1>
              </div>
            ) : isSeeWords ? (
              <img
                src="../../../../static/images/countObjects.png"
                height={390}
                width={690}
                margin={"auto"}
              ></img>
            ) : (
              <div className="hideWords" styleName="hideWords">
                <h1>{"Введите ответ"}</h1>
              </div>
            )}
            <div className="butContainer" styleName="butContainer">
              {isFinal ? (
                <div>
                  <Link to={isParam ? "/params" : "/course"}>
                    <button> {"Далее"}</button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Input
                    id={"userAmountofObj"}
                    value={userAmountOfObj}
                    label={"объектов"}
                    onChange={handleUserAmountOfObj}
                  />
                  <button onClick={handleDoneButton}> {"Готово"}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("CountObjects"),
  mapDispatchToProps("CountObjects")
)(CSSModules(CountObjects, styles, { allowMultiple: true }));
