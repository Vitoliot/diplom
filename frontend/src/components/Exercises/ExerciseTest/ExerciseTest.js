import React from "react";
import { useState } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import styles from "./ExerciseTest.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapDispatchToProps from "../../../store/mapDispatchToProps";

const ExerciseTest = ({
  item,
  taskId,
  usercourseId,
  usertaskId,
  isLogged,
  createAnswer,
  createUserTask,
  createQER,
  isParam,
  doneTask,
  QERTest,
  words,
  time,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExerciseTestDone, setIsExerciseTestDone] = useState(false);
  let maxPage = 1;
  let questionParts = [];

  function divideQuestionsToPage(questions) {
    let divVal = 5;
    if (questions.length > divVal) {
      let iMax =
        questions.length % divVal === 0
          ? (questions.length - (questions.length % divVal)) / divVal
          : (questions.length - (questions.length % divVal)) / divVal + 1;
      maxPage = iMax != 0 ? iMax : 1;
      for (let i = 0; i < iMax; i++) {
        questionParts.push(
          questions.slice(
            i * divVal,
            (i + 1) * divVal > questions.length
              ? questions.length
              : (i + 1) * divVal
          )
        );
      }
    } else {
      questionParts.push(questions);
    }
    console.log(questionParts);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function parseAnswers() {
    let correct_answers = 0;
    item.questions.forEach((question) => {
      let answer = document.getElementsByName(
        question.number + " posible_answer_1"
      )[0];
      console.log(answer, answer.checked);
      if (answer.checked) {
        if (isLogged && !QERTest) {
          createAnswer(usertaskId, question.number, answer.value, item.id);
        }
      }
      answer = document.getElementsByName(
        question.number + " posible_answer_2"
      )[0];
      if (answer.checked) {
        if (isLogged && !QERTest) {
          createAnswer(usertaskId, question.number, answer.value, item.id);
        }
      }
      answer = document.getElementsByName(
        question.number + " posible_answer_3"
      )[0];
      if (answer.checked) {
        if (isLogged && !QERTest) {
          createAnswer(usertaskId, question.number, answer.value, item.id);
        }
      }
      answer = document.getElementsByName(question.number + " answer")[0];
      if (answer.checked) {
        correct_answers++;
        if (isLogged && !QERTest) {
          createAnswer(usertaskId, question.number, answer.value, item.id);
        }
      }
    });
    return correct_answers / item.questions.length;
  }

  function parseAnswersQER(words, correctness) {
    let WPM = Math.ceil((words / time) * 60);
    let QER = Math.ceil((WPM * correctness * 100) / 1000);
    return [QER, WPM, correctness * 100];
  }

  function handleDoneButton() {
    if (isLogged && !QERTest) createUserTask(taskId, usercourseId, time);
    let correctness = Math.ceil(parseAnswers());
    let QER = [0, 0, 0];
    if (QERTest) {
      QER = parseAnswersQER(words, correctness);
    }
    if (isLogged && QERTest) {
      createQER(QER[0], QER[1], QER[2]);
    }
    doneTask(correctness * 100);
    setIsExerciseTestDone(true);
  }
  divideQuestionsToPage(item.questions);

  return (
    <div className="exerciseTestParent" styleName="exerciseTestParent">
      <div className="exerciseTestContainer" styleName="exerciseTestContainer">
        <div>
          <h2> {item.title} </h2>
          <div
            className="currentPageContainer"
            styleName="currentPageContainer"
          >
            <h3>{currentPage + "/" + maxPage}</h3>
          </div>
        </div>
        <div className="questionsContainer" styleName="questionsContainer">
          {questionParts[currentPage - 1].map((question) => {
            return (
              <div>
                <div
                  className="questionContainer"
                  styleName="questionContainer"
                >
                  <div>
                    <h3>{question.number}</h3>
                  </div>
                  <h3>{question.question}</h3>
                </div>
                <div>
                  <form>
                    {question.posible_answer_1 ? (
                      <div
                        styleName={
                          isExerciseTestDone ? "incorrect" : "posAnswer"
                        }
                      >
                        <input
                          type="radio"
                          name={question.number + " posible_answer_1"}
                          value={question.posible_answer_1}
                        ></input>
                        <label for={question.posible_answer_1}>
                          {question.posible_answer_1}
                        </label>
                      </div>
                    ) : null}
                    {question.posible_answer_2 ? (
                      <div
                        styleName={
                          isExerciseTestDone ? "incorrect" : "posAnswer"
                        }
                      >
                        <input
                          type="radio"
                          name={question.number + " posible_answer_2"}
                          value={question.posible_answer_2}
                        ></input>
                        <label for={question.posible_answer_2}>
                          {question.posible_answer_2}
                        </label>
                      </div>
                    ) : null}
                    {question.answer ? (
                      <div
                        styleName={isExerciseTestDone ? "correct" : "posAnswer"}
                      >
                        <input
                          type="radio"
                          name={question.number + " answer"}
                          value={question.answer}
                        ></input>
                        <label for={question.answer}>{question.answer}</label>
                      </div>
                    ) : null}
                    {question.posible_answer_3 ? (
                      <div
                        styleName={
                          isExerciseTestDone ? "incorrect" : "posAnswer"
                        }
                      >
                        <input
                          type="radio"
                          name={question.number + " posible_answer_3"}
                          value={question.posible_answer_3}
                        ></input>
                        <label for={question.posible_answer_3}>
                          {question.posible_answer_3}
                        </label>
                      </div>
                    ) : null}
                  </form>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {isExerciseTestDone ? (
            <Link
              to={isLogged ? (isParam ? "/params" : "/course") : "/"}
              style={{ margin: "auto" }}
            >
              <button className="doneButton" styleName="doneButton">
                {"Далее"}
              </button>
            </Link>
          ) : (
            <button
              onClick={handleDoneButton}
              className="doneButton"
              styleName="doneButton"
            >
              {"Готово"}
            </button>
          )}
          <div className="changeButton" styleName="changeButton">
            <button onClick={handlePreviousPage}>
              <img
                src="../../../../static/images/dropright.svg"
                width={24}
                height={32}
                color="#EBE2CA"
              ></img>
            </button>
            <button onClick={handleNextPage}>
              <img
                src="../../../../static/images/dropleftc.svg"
                width={24}
                height={32}
                color="#EBE2CA"
              ></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("ExerciseTest"),
  mapDispatchToProps("ExerciseTest")
)(CSSModules(ExerciseTest, styles, { allowMultiple: true }));
