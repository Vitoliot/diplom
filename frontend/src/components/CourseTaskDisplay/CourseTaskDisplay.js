import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./CourseTaskDisplay.css";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";

const CourseTaskDisplay = ({
  task,
  usertasks,
  isLogged,
  indexesOfCompleteTasks,
  onChangeCurrentTask,
  onDeleteAnswer,
}) => {

  let [overviewOrAnswers, setOverviewOrAnswers] = useState(0);
  let taskInfoFromUserTasks = null;

  usertasks
    ? usertasks.every((usertask) => {
        if (usertask.id === task.task.id) {
          taskInfoFromUserTasks = usertask;
          return false;
        }
        return true;
      })
    : null;

  function handleOverviewOrAnswersChange(param) {
    return () => setOverviewOrAnswers(param);
  }

  function taskHeadOn(target) {
    console.log(target);
    var pan = target.nextElementSibling;
    var accordSrc = target.firstChild;
    if (pan.style.maxHeight) {
      pan.style.maxHeight = null;
      pan.style.padding = "0 18px";
      accordSrc.src = "../../../static/images/dropdown.svg";
    } else {
      pan.style.maxHeight = pan.scrollHeight + "px";
      pan.style.padding = "2 em";
      accordSrc.src = "../../../static/images/dropup.svg";
    }
  }

  let [lookAnswer, setLookAnswer] = useState(false);
  return (
    <div>
      <button
        styleName="taskHead"
        className="taskHead"
        onClick={(e) => taskHeadOn(e.target)}
      >
        <div>
          <img
            src="../../../static/images/dropdown.svg"
            width={50}
            height={50}
            color="#908373"
            overflow={"visible"}
          />
          <h3> {task.number + "."} </h3>
        </div>
        <h3> {task.task.title} </h3>
        {indexesOfCompleteTasks.includes(task.task.id) ? (
          <h3> выполнено </h3>
        ) : null}
      </button>
      <div styleName="taskPanel" className="taskPanel">
        <div styleName="taskPanelContent" className="taskPanelContent">
          <div styleName="taskPanelButtons" className="taskPanelButtons">
            <button onClick={handleOverviewOrAnswersChange(0)}>Описание</button>
            {taskInfoFromUserTasks && (
              <button onClick={handleOverviewOrAnswersChange(1)}>
                Характеристики
              </button>
            )}
            {taskInfoFromUserTasks && taskInfoFromUserTasks.is_complete && (
              <button onClick={handleOverviewOrAnswersChange(2)}>Ответы</button>
            )}
          </div>
          {overviewOrAnswers === 1 && (
            <div
              styleName="taskPanelProperties"
              className="taskPanelProperties"
            >
              <div>
                <h4>{"Пройдено за"}</h4>
                <h3>{taskInfoFromUserTasks.time}</h3>
              </div>
              <div>
                <h4>{"Пройдено на"}</h4>
                <h3>{taskInfoFromUserTasks.correctness}</h3>
              </div>
              <div>
                <h4>{"Пройдено когда"}</h4>
                <h3>{taskInfoFromUserTasks.date_init}</h3>
              </div>
              <div>
                <h4>{"Пройдено ли"}</h4>
                <h3>{taskInfoFromUserTasks.is_complete ? "Да" : "Нет"}</h3>
              </div>
            </div>
          )}
          {overviewOrAnswers === 2 && taskInfoFromUserTasks.is_complete && (
            <div styleName="taskPanelAnswers" className="taskPanelAnswers">
              {task.task.items[0].questions.map((question) => {
                let answer = taskInfoFromUserTasks.answers.find((answer) => {
                  return answer.number === question.number;
                });

                return (
                  <div>
                    <div>
                      <h4> {"Вопрос №" + question.number} </h4>
                      <h3> {question.question} </h3>
                    </div>
                    <div>
                      <h4> {"Ответ"} </h4>
                      <div styleName="ansContainer">
                        <h3> {answer ? answer.answer : "Нет ответа"} </h3>
                        <button
                          styleName="delAnsBut"
                          onClick={() => {
                            taskInfoFromUserTasks.answers[
                              answer.number - 1
                            ].answer = null;
                            onDeleteAnswer(answer.id);
                          }}
                        >
                          <img src="../../../static/images/del_ans.svg" color="#ebe2ca"/>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4> {"Правильный ответ"} </h4>
                      {lookAnswer ? (
                        <h3> {question.answer} </h3>
                      ) : (
                        <button
                          styleName="lookAnsBut"
                          onClick={() => {
                            setLookAnswer(true);
                          }}
                        >
                          {"Посмотреть"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {overviewOrAnswers === 0 && (
            <div styleName="taskPanelOverview" className="taskPanelOverview">
              <div styleName="taskOverview" className="taskOverview">
                <h4>{"Описание"}</h4>
                <h3>{task.task.overview}</h3>
              </div>
              <div styleName="taskType" className="taskType">
                <div>
                  <h4>{"Тема"}</h4>
                  <h3>{task.task.theme}</h3>
                </div>
                <div>
                  <h4>{"Тип"}</h4>
                  <h3>{task.task.type}</h3>
                </div>
              </div>
              <div>
                <Link to="/exercise">
                  <button
                    onClick={() => {
                      onChangeCurrentTask(task);
                    }}
                  >
                    {taskInfoFromUserTasks ? "Перепройти" : "К выполнению"}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps("CourseTaskDisplay")
)(CSSModules(CourseTaskDisplay, styles, { allowMultiple: true }));
