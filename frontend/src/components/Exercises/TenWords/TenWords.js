import React, { useEffect } from "react";
import { useState } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import styles from "./TenWords.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/mapDispatchToProps";
import words from "./words";
import Input from "../../Input/Input";
import { Link } from "react-router-dom";

const TenWords = ({
  item,
  isLogged,
  usertaskId,
  taskId,
  usercourseId,
  createVM,
  createVMWP,
  createAnswer,
  doneTask,
  createUserTask,
  time,
  isParam,
  withPosition,
}) => {
  //   Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  // Math.random() * words.length
  console.log(words);
  const [isExerciseTest, setIsExerciseTest] = useState(false);
  const [isSeeWords, setIsSeeWords] = useState(false);
  const [isExplain, setIsExplain] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [counter, setCounter] = useState(3);
  const [tenWords, setTenWords] = useState({
    firstAnswer: words[1],
    secondAnswer: words[2],
    thirdAnswer: words[3],
    fourAnswer: words[4],
    fiveAnswer: words[5],
    sixAnswer: words[6],
    sevenAnswer: words[7],
    eightAnswer: words[8],
    nineAnswer: words[9],
    tenAnswer: words[10],
  });
  const [tenAnswers, setTenAnswers] = useState({
    firstAnswer: "",
    secondAnswer: "",
    thirdAnswer: "",
    fourAnswer: "",
    fiveAnswer: "",
    sixAnswer: "",
    sevenAnswer: "",
    eightAnswer: "",
    nineAnswer: "",
    tenAnswer: "",
  });
  console.log("Тест2");

  useEffect(() => {
    const countdown =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (isExplain && countdown == 0) {
      setIsExplain(false);
      setIsSeeWords(true);
      setCounter(10);
    }
    if (!isExplain && isSeeWords && !isExerciseTest && countdown == 0) {
      setIsExerciseTest(true);
      setIsSeeWords(false);
    }
    return () => clearInterval(countdown);
  }, [counter]);

  function checkAnswers() {
    let correctness = 0;
    let wordsFrom = Object.values(tenWords);
    for (var key in tenAnswers) {
      let answer = tenAnswers[key];
      if (answer === tenWords[key]) {
        correctness += 10;
      } else {
        if (wordsFrom.includes(answer)) {
          correctness += 5;
          wordsFrom.splice(wordsFrom.indexOf(answer), 1);
        }
      }
    }

    return correctness;
  }

  function handleFirstAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { firstAnswer: e.target.value })
    );
  }
  function handleSecondAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { secondAnswer: e.target.value })
    );
  }
  function handleThirdAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { thirdAnswer: e.target.value })
    );
  }
  function handleFourAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { fourAnswer: e.target.value })
    );
  }
  function handleFiveAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { fiveAnswer: e.target.value })
    );
  }
  function handleSixAnswer(e) {
    setTenAnswers(Object.assign({}, tenAnswers, { sixAnswer: e.target.value }));
  }
  function handleSevenAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { sevenAnswer: e.target.value })
    );
  }
  function handleEightAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { eightAnswer: e.target.value })
    );
  }
  function handleNineAnswer(e) {
    setTenAnswers(
      Object.assign({}, tenAnswers, { nineAnswer: e.target.value })
    );
  }
  function handleTenAnswer(e) {
    setTenAnswers(Object.assign({}, tenAnswers, { tenAnswer: e.target.value }));
  }

  function handleDoneButton() {
    let correctness = 0;
    if (isLogged) {
      correctness = checkAnswers();
      if (!isParam) createUserTask(taskId, usercourseId, time, correctness);
      if (withPosition) createVMWP(correctness);
      else createVM(correctness);
    }
    doneTask(correctness);
    setIsSeeWords(true);
    setIsFinal(true);
  }

  console.log("Тест3");
  return (
    <div styleName="tenWordsParentContainer">
      <div>
        {isExplain && (
          <div className="explainContainer" styleName="explainContainer">
            <h1>{counter}</h1>
          </div>
        )}
        {isSeeWords ? (
          withPosition ? (
            <div
              className="tenWordsWithPosition"
              styleName="tenWordsWithPosition"
            >
              <h2>{tenWords.firstAnswer}</h2>
              <h2>{tenWords.secondAnswer}</h2>
              <h2>{tenWords.thirdAnswer}</h2>
              <h2>{tenWords.fourAnswer}</h2>
              <h2>{tenWords.fiveAnswer}</h2>
              <h2>{tenWords.sixAnswer}</h2>
              <h2>{tenWords.sevenAnswer}</h2>
              <h2>{tenWords.eightAnswer}</h2>
              <h2>{tenWords.nineAnswer}</h2>
              <h2>{tenWords.tenAnswer}</h2>
            </div>
          ) : (
            <div styleName="tenWordsWithoutPosition">
              <div>
                <div>
                  <div id="1" styleName="wordNumber">
                    <h3>{1}</h3>
                  </div>
                  <h2>{tenWords.firstAnswer}</h2>
                </div>
                <div>
                  <div id="2" styleName="wordNumber">
                    <h3>{2}</h3>
                  </div>
                  <h2>{tenWords.secondAnswer}</h2>
                </div>
                <div>
                  <div id="3" styleName="wordNumber">
                    <h3>{3}</h3>
                  </div>
                  <h2>{tenWords.thirdAnswer}</h2>
                </div>
                <div>
                  <div id="4" styleName="wordNumber">
                    <h3> {4}</h3>
                  </div>
                  <h2>{tenWords.fourAnswer}</h2>
                </div>
                <div>
                  <div id="5" styleName="wordNumber">
                    <h3> {5}</h3>
                  </div>
                  <h2>{tenWords.fiveAnswer}</h2>
                </div>
              </div>
              <div>
                <div>
                  <div id="6" styleName="wordNumber">
                    <h3> {6}</h3>
                  </div>
                  <h2>{tenWords.sixAnswer}</h2>
                </div>
                <div>
                  <div id="7" styleName="wordNumber">
                    <h3> {7}</h3>
                  </div>
                  <h2>{tenWords.sevenAnswer}</h2>
                </div>
                <div>
                  <div id="8" styleName="wordNumber">
                    <h3> {8}</h3>
                  </div>
                  <h2>{tenWords.eightAnswer}</h2>
                </div>
                <div>
                  <div id="9" styleName="wordNumber">
                    <h3> {9}</h3>
                  </div>
                  <h2>{tenWords.nineAnswer}</h2>
                </div>
                <div>
                  <div id="10" styleName="wordNumber">
                    <h3> {10}</h3>
                  </div>
                  <h2>{tenWords.tenAnswer}</h2>
                </div>
              </div>
            </div>
          )
        ) : !isExplain ? (
          <div className="hideWords" styleName="hideWords">
            <h1>Заполните пустые поля</h1>
          </div>
        ) : null}
      </div>
      {withPosition ? (
        <div>
          <div
            className="tenWordsWithPositionAnswers"
            styleName="tenWordsWithPositionAnswers"
          >
            <div>
              <div>
                <Input
                  id={"firstAnswer"}
                  value={tenAnswers.firstAnswer}
                  label={""}
                  onChange={handleFirstAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"secondAnswer"}
                  value={tenAnswers.secondAnswer}
                  label={""}
                  onChange={handleSecondAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"thirdAnswer"}
                  value={tenAnswers.thirdAnswer}
                  label={""}
                  onChange={handleThirdAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"fourAnswer"}
                  value={tenAnswers.fourAnswer}
                  label={""}
                  onChange={handleFourAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"fiveAnswer"}
                  value={tenAnswers.fiveAnswer}
                  label={""}
                  onChange={handleFiveAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"sixAnswer"}
                  value={tenAnswers.sixAnswer}
                  label={""}
                  onChange={handleSixAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"sevenAnswer"}
                  value={tenAnswers.sevenAnswer}
                  label={""}
                  onChange={handleSevenAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"eightAnswer"}
                  value={tenAnswers.eightAnswer}
                  label={""}
                  onChange={handleEightAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"nineAnswer"}
                  value={tenAnswers.nineAnswer}
                  label={""}
                  onChange={handleNineAnswer}
                ></Input>
              </div>
              <div>
                <Input
                  id={"tenAnswer"}
                  value={tenAnswers.tenAnswer}
                  label={""}
                  onChange={handleTenAnswer}
                ></Input>
              </div>
            </div>
            <div>
              {isFinal ? (
                <Link to={isParam ? "/params" : "/course"}>
                  <button> {"Далее"}</button>
                </Link>
              ) : (
                <button onClick={handleDoneButton}> {"Готово"}</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div styleName="tenWordsWithoutPositionAnswer">
            <div>
              <div>
                <div>
                  <div id="1" styleName="wordNumber">
                    <h3>{1}</h3>
                  </div>
                  <Input
                    id={"firstAnswer"}
                    value={tenAnswers.firstAnswer}
                    label={""}
                    onChange={handleFirstAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="2" styleName="wordNumber">
                    <h3>{2}</h3>
                  </div>
                  <Input
                    id={"secondAnswer"}
                    value={tenAnswers.secondAnswer}
                    label={""}
                    onChange={handleSecondAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="3" styleName="wordNumber">
                    <h3>{3}</h3>
                  </div>
                  <Input
                    id={"thirdAnswer"}
                    value={tenAnswers.thirdAnswer}
                    label={""}
                    onChange={handleThirdAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="4" styleName="wordNumber">
                    <h3> {4}</h3>
                  </div>
                  <Input
                    id={"fourAnswer"}
                    value={tenAnswers.fourAnswer}
                    label={""}
                    onChange={handleFourAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="5" styleName="wordNumber">
                    <h3> {5}</h3>
                  </div>
                  <Input
                    id={"fiveAnswer"}
                    value={tenAnswers.fiveAnswer}
                    label={""}
                    onChange={handleFiveAnswer}
                  ></Input>
                </div>
              </div>
              <div>
                <div>
                  <div id="6" styleName="wordNumber">
                    <h3> {6}</h3>
                  </div>
                  <Input
                    id={"sixAnswer"}
                    value={tenAnswers.sixAnswer}
                    label={""}
                    onChange={handleSixAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="7" styleName="wordNumber">
                    <h3> {7}</h3>
                  </div>
                  <Input
                    id={"sevenAnswer"}
                    value={tenAnswers.sevenAnswer}
                    label={""}
                    onChange={handleSevenAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="8" styleName="wordNumber">
                    <h3> {8}</h3>
                  </div>
                  <Input
                    id={"eightAnswer"}
                    value={tenAnswers.eightAnswer}
                    label={""}
                    onChange={handleEightAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="9" styleName="wordNumber">
                    <h3> {9}</h3>
                  </div>
                  <Input
                    id={"nineAnswer"}
                    value={tenAnswers.nineAnswer}
                    label={""}
                    onChange={handleNineAnswer}
                  ></Input>
                </div>
                <div>
                  <div id="10" styleName="wordNumber">
                    <h3> {10}</h3>
                  </div>
                  <Input
                    id={"tenAnswer"}
                    value={tenAnswers.tenAnswer}
                    label={""}
                    onChange={handleTenAnswer}
                  ></Input>
                </div>
              </div>
            </div>
            <div>
              {isFinal ? (
                <Link to={isParam ? "/params" : "/course"}>
                  <button> {"Далее"}</button>
                </Link>
              ) : (
                <button onClick={handleDoneButton}> {"Готово"}</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps("TenWords"),
  mapDispatchToProps("TenWords")
)(CSSModules(TenWords, styles, { allowMultiple: true }));
