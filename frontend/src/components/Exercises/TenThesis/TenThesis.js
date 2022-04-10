import React from "react";
import { useState, useCallback } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import styles from "./TenThesis.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mapDispatchToProps from "../../../store/mapDispatchToProps";
import QuestionItem from "./QuestionItem";
import { Link } from "react-router-dom";

const TenThesis = ({
  item,
  isLogged,
  usertaskId,
  taskId,
  usercourseId,
  createLM,
  createAnswer,
  doneTask,
  createUserTask,
  time,
  isParam,
}) => {
  const [isTenThesisDone, setIsTenThesisDone] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const moveQuestionListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = questionsArray[dragIndex];
      const hoverItem = questionsArray[hoverIndex];
      setQuestionsArray((questions) => {
        const updatedQuestions = [...questionsArray];
        updatedQuestions[dragIndex] = hoverItem;
        updatedQuestions[hoverIndex] = dragItem;
        return updatedQuestions;
      });
    },
    [questionsArray]
  );

  function shuffle(arr) {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
    return array;
  }

  function getRightAnswers(arr) {
    let rightAnswrs = [];
    arr.forEach((element) => {
      rightAnswrs.push(element.answer);
    });
    return rightAnswrs;
  }

  if (!isShuffled) {
    setQuestionsArray(shuffle(item.questions));
    setIsShuffled(true);
  }

  function getAnswer(qNumber, qIndex) {
    let answer = document.getElementsByName(qNumber + " posible_answer_1")[0];
    let ansNumDiv =
      answer.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild;
    console.log("1", ansNumDiv.style.background);
    if (qNumber == qIndex) {
      ansNumDiv.style.background = "#9ac563";
    } else {
      ansNumDiv.style.background = "#db6d6d";
    }
    console.log("2", ansNumDiv.style.background);
    if (answer.checked) {
      if (isLogged && !isParam) {
        createAnswer(usertaskId, qNumber, answer.value, item.id);
      }
      return answer.value;
    }
    answer = document.getElementsByName(qNumber + " posible_answer_2")[0];
    if (answer.checked) {
      if (isLogged && !isParam) {
        createAnswer(usertaskId, qNumber, answer.value, item.id);
      }
      return answer.value;
    }
    answer = document.getElementsByName(qNumber + " posible_answer_3")[0];
    if (answer.checked) {
      if (isLogged && !isParam) {
        createAnswer(usertaskId, qNumber, answer.value, item.id);
      }
      return answer.value;
    }
    answer = document.getElementsByName(qNumber + " answer")[0];
    if (answer.checked) {
      if (isLogged && !isParam) {
        createAnswer(usertaskId, qNumber, answer.value, item.id);
      }
      return answer.value;
    }
    return "incorrect";
  }

  function checkAnswers() {
    let correctness = 0;
    let rightAnswers = getRightAnswers(item.questions);
    console.log("rightAbnsw", rightAnswers);
    for (let i = 1; i <= questionsArray.length; i++) {
      let answer = getAnswer(questionsArray[i - 1].number, i);
      if (rightAnswers.includes(answer)) {
        correctness += 5;
        rightAnswers.splice(rightAnswers.indexOf(answer), 1);
        if (i == questionsArray[i - 1].number) {
          correctness += 5;
        }
      }
    }
    return correctness;
  }

  function handleDoneButton() {
    let correctness = 0;
    correctness = checkAnswers();
    if (isLogged) {
      if (!isParam) createUserTask(taskId, usercourseId, time);
      createLM(correctness);
    }
    doneTask(correctness);
    setIsTenThesisDone(true);
  }
  return (
    <div className="TenThesisParent" styleName="TenThesisParent">
      <div className="TenThesisContainer" styleName="TenThesisContainer">
        <div>
          <h2> {item.title} </h2>
        </div>
        <DndProvider backend={HTML5Backend}>
          {/* <div className="questionsContainer" styleName="questionsContainer">
            {questionsArray.map((question, index) => {
              return (
                <QuestionItem
                  question={question}
                  index={index}
                  isTenThesisDone={isTenThesisDone}
                  moveListItem={moveQuestionListItem}
                ></QuestionItem>
              );
            })}
          </div> */}
          <div styleName="questionsContainer">
            <div>
              {questionsArray
                .slice(0, questionsArray.length / 2)
                .map((question, index) => {
                  return (
                    <QuestionItem
                      question={question}
                      index={index}
                      isTenThesisDone={isTenThesisDone}
                      moveListItem={moveQuestionListItem}
                    ></QuestionItem>
                  );
                })}
            </div>
            <div>
              {questionsArray
                .slice(questionsArray.length / 2, questionsArray.length)
                .map((question, index) => {
                  return (
                    <QuestionItem
                      question={question}
                      index={index + questionsArray.length / 2}
                      isTenThesisDone={isTenThesisDone}
                      moveListItem={moveQuestionListItem}
                    ></QuestionItem>
                  );
                })}
            </div>
          </div>
        </DndProvider>
        <div>
          {isTenThesisDone ? (
            <Link
              to={isLogged ? (isParam ? "/params" : "/course") : "/taskCatalog"}
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
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("TenThesis"),
  mapDispatchToProps("TenThesis")
)(CSSModules(TenThesis, styles, { allowMultiple: true }));
