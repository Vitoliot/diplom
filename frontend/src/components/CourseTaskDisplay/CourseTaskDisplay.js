import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./CourseTaskDisplay.css";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";

const CourseTaskDisplay = ({
  task,
  usertasks,
  onChangeCurrentTask,
  onDeleteAnswer,
}) => {
  let [overviewOrAnswers, setOverviewOrAnswers] = useState(0);
  let [taskInfoFromUserTasks, setTaskInfoFromUserTasks] = useState({});

  taskInfoFromUserTasks = usertasks.find((usertask) => {
    return usertask.task == task.task.id;
  });

  function handleOverviewOrAnswersChange(param) {
    return () => setOverviewOrAnswers(param);
  }

  function taskHeadOn(target) {
    var pan = target.nextElementSibling;
    var accordSrc = target.firstChild;
    if (pan.style.maxHeight) {
      pan.style.minHeight = null;
      pan.style.maxHeight = null;
      pan.style.padding = "0 18px";
      accordSrc.src = "../../../static/images/dropdown.svg";
    } else {
      pan.style.overflow = "scroll";
      pan.style.minHeight = pan.scrollHeight + "px";
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
        <h3
          style={taskInfoFromUserTasks?.is_complete ? { color: "#9ac563" } : {}}
        >
          {" "}
          {task.task.title}{" "}
        </h3>
      </button>
      <div styleName="taskPanel" className="taskPanel">
        <div styleName="taskPanelContent" className="taskPanelContent">
          <div styleName="taskPanelButtons" className="taskPanelButtons">
            <button onClick={handleOverviewOrAnswersChange(0)}>????????????????</button>
            {taskInfoFromUserTasks && (
              <button onClick={handleOverviewOrAnswersChange(1)}>
                ????????????????????????????
              </button>
            )}
            {taskInfoFromUserTasks && taskInfoFromUserTasks.is_complete && (
              <button onClick={handleOverviewOrAnswersChange(2)}>????????????</button>
            )}
          </div>
          {overviewOrAnswers === 1 && (
            <div
              styleName="taskPanelProperties"
              className="taskPanelProperties"
            >
              <div>
                <h4>{"???????????????? ????"}</h4>
                <h3>{taskInfoFromUserTasks.time}</h3>
              </div>
              <div>
                <h4>{"???????????????? ????"}</h4>
                <h3>{taskInfoFromUserTasks.correctness}</h3>
              </div>
              <div>
                <h4>{"???????????????? ??????????"}</h4>
                <h3>
                  {new Date(taskInfoFromUserTasks.date_init).toLocaleDateString(
                    "ru"
                  )}
                </h3>
              </div>
              <div>
                <h4>{"???????????????? ????"}</h4>
                <h3>{taskInfoFromUserTasks.is_complete ? "????" : "??????"}</h3>
              </div>
            </div>
          )}
          {overviewOrAnswers === 2 && taskInfoFromUserTasks.is_complete && (
            <div styleName="taskPanelAnswers" className="taskPanelAnswers">
              {task.task.items[0].questions.map((question) => {
                let answer = taskInfoFromUserTasks.answers.find((answer) => {
                  return answer ? answer.number === question.number : false;
                });

                return (
                  <div>
                    <div>
                      <h4> {"???????????? ???" + question.number} </h4>
                      <h3> {question.question} </h3>
                    </div>
                    <div>
                      <h4> {"??????????"} </h4>
                      <div styleName="ansContainer">
                        <h3> {answer ? answer.answer : "?????? ????????????"} </h3>

                        {answer && (
                          <button
                            styleName="delAnsBut"
                            onClick={() => {
                              onDeleteAnswer(answer.id);
                              taskInfoFromUserTasks.answers[answer.number - 1] =
                                null;
                            }}
                          >
                            <img
                              src="../../../static/images/del_ans.svg"
                              color="#ebe2ca"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4> {"???????????????????? ??????????"} </h4>
                      {lookAnswer ? (
                        <h3> {question.answer} </h3>
                      ) : (
                        <button
                          styleName="lookAnsBut"
                          onClick={() => {
                            setLookAnswer(true);
                          }}
                        >
                          {"????????????????????"}
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
                <h4>{"????????????????"}</h4>
                <h3>{task.task.overview}</h3>
              </div>
              <div styleName="taskType" className="taskType">
                <div>
                  <h4>{"????????"}</h4>
                  <h3>{task.task.theme}</h3>
                </div>
                <div>
                  <h4>{"??????"}</h4>
                  <h3>{task.task.type}</h3>
                </div>
              </div>
              <div>
                <Link to="/exercise">
                  <button
                    onClick={() => {
                      onChangeCurrentTask(task.task.id);
                    }}
                  >
                    {taskInfoFromUserTasks ? "????????????????????" : "?? ????????????????????"}
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
