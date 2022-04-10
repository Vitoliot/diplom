import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Course.css";
import CourseTaskDisplay from "../CourseTaskDisplay/CourseTaskDisplay";
import Header from "../Header/Header";
import ProgressBar from "../ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

const Course = ({
  current_course,
  isLogged,
  onCourseAdd,
  onFetchTodayCompleteTasks,
  onChangeCurrentTask,
  onInit,
  todayCompleteTasks,
  taskInDay,
}) => {
  const [currModule, setCurrModule] = useState(-1);
  const [isUserCourse, setIsUserCourse] = useState(false);
  const [nextTask, setNextTask] = useState({});

  console.log(current_course.data.count_of_complete_tasks, current_course.data.count_of_tasks)

  function handleCurrModuleChange(number) {
    return () => setCurrModule(number - 1);
  }
  let [amountOfCompleteTasks, setAmountOfCompleteTasks] = useState([]);
  let indexesOfCompleteTasks = [];
  useEffect(() => {
    if (
      (!current_course.isLoading && !current_course.isFetched) ||
      current_course.isChanged
    ) {
      onInit(current_course.data.course.id, isLogged);
    }
    if (Object.keys(nextTask).length === 0) {
      setIsUserCourse(current_course.data.hasOwnProperty("usertasks"));
      if (isUserCourse) {
        indexesOfCompleteTasks = defineIndexesOfCompleteTasks();
        setAmountOfCompleteTasks(
          defineNumOfCompleteTasks(indexesOfCompleteTasks)
        );
        setNextTask(findNextTask(indexesOfCompleteTasks));
        console.log(nextTask);
        // onChangeCurrentTask(nextTask);
      }
    }
    console.log(nextTask);
  });

  function defineIndexesOfCompleteTasks() {
    let indexesOfCompleteTasks = [];
    current_course.data.usertasks.forEach((element) => {
      element.is_complete ? indexesOfCompleteTasks.unshift(element.task) : null;
    });
    return indexesOfCompleteTasks;
  }

  function defineNumOfCompleteTasks(indexesOfCompleteTasks) {
    let amountOfCompleteTasks = [];
    let modules = current_course.data.course.modules;
    modules.forEach((element) => {
      let count = 0;
      element.moduletasks.forEach((element) => {
        indexesOfCompleteTasks.includes(element.task.id) ? count++ : null;
      });
      amountOfCompleteTasks.push(count);
    });
    return amountOfCompleteTasks;
  }

  function findNextTask(indexesOfCompleteTasks) {
    let nextTask = {};
    let modules = current_course.data.course.modules;
    modules.forEach((element) => {
      element.moduletasks.every((element) => {
        if (!indexesOfCompleteTasks.includes(element.task.id)) {
          nextTask = element.task;
          console.log("yeaaaaaah");
          return false;
        }
        return true;
      });
    });
    console.log("fnt", nextTask, Object.keys(nextTask).length);
    return nextTask;
  }

  return (
    <section>
      {current_course.data.hasOwnProperty("course") &&
      !current_course.data.course.hasOwnProperty("title") ? (
        <h1> Loading... </h1>
      ) : (
        <section>
          <Header title={current_course.data.course.title} />
          <div
            className="courseParentContainer"
            styleName="courseParentContainer"
          >
            <div className="courseContainer" styleName="courseContainer">
              <div className="leftPanel" styleName="leftPanel">
                <div
                  className="courseTitle"
                  styleName="courseTitle"
                  onClick={handleCurrModuleChange(-1)}
                >
                  <div>
                    <h3> {"Курс"} </h3>
                    <h2> {current_course.data.course.title} </h2>
                  </div>
                  {isLogged && isUserCourse && (
                    <ProgressBar
                      count_of_complete_tasks={current_course.data.count_of_complete_tasks}
                      count_of_tasks={current_course.data.count_of_tasks}
                    />
                  )}
                  {isLogged && isUserCourse && (
                    <div>
                      <h3>{"Заданий выполнено"}</h3>
                      <h2>{current_course.data.count_of_complete_tasks}</h2>
                    </div>
                  )}
                </div>
                {current_course.data.course.modules.map((module) => (
                  <button onClick={handleCurrModuleChange(module.number)}>
                    <div>
                      <h3> {"Модуль"} </h3>
                      <h2> {module.title} </h2>
                    </div>
                    {isLogged ? (
                      <div>
                        <h2>
                          {amountOfCompleteTasks[Number(module.number - 1)]}
                        </h2>
                        <h3>{"из"}</h3>
                        <h2>{module.moduletasks.length}</h2>
                      </div>
                    ) : (
                      <div>
                        <h3> {"Всего заданий"} </h3>
                        <h2> {module.moduletasks.length} </h2>
                      </div>
                    )}
                  </button>
                ))}
                {isLogged && isUserCourse && (
                  <div className="nextTask" styleName="nextTask">
                    {todayCompleteTasks.data.amount_of_tasks < taskInDay ? (
                      Object.keys(nextTask).length !== 0 ? (
                        <div
                          style={{
                            display: "flex",
                            "flex-direction": "column",
                            gap: "1em",
                          }}
                        >
                          <h2 style={{ margin: "auto" }}>
                            {"Следующее задание"}
                          </h2>
                          <span style={{ margin: "auto" }}>
                            {nextTask.title}
                          </span>
                          <Link style={{ margin: "auto" }} to="/exercise">
                            <button
                              style={{ margin: "auto" }}
                              onClick={() => {
                                onChangeCurrentTask(nextTask);
                              }}
                            >
                              Приступить
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <h3> Курс окончен</h3>
                        </div>
                      )
                    ) : (
                      <div>
                        <h3> Сегодняшняя норма выполнена</h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="rightPanel" styleName="rightPanel">
                <div>
                  {currModule !== -1 ? (
                    <div>
                      <div className="moduleInfo" styleName="moduleInfo">
                        <div>
                          <span>
                            {
                              current_course.data.course.modules[currModule]
                                .title
                            }
                          </span>
                        </div>
                        <div>
                          <h3>
                            {
                              current_course.data.course.modules[currModule]
                                .overview
                            }
                          </h3>
                        </div>
                      </div>
                      <div className="tasks" styleName="tasks">
                        {current_course.data.course.modules[
                          currModule
                        ].moduletasks.map((task) => (
                          <CourseTaskDisplay
                            task={task}
                            usertasks={
                              isUserCourse
                                ? current_course.data.usertasks
                                : null
                            }
                            isLogged={isLogged}
                            indexesOfCompleteTasks={indexesOfCompleteTasks}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="courseData" styleName="courseData">
                      <div>
                        <h2>{current_course.data.course.title}</h2>
                      </div>
                      <div>
                        <h2>{current_course.data.course.created_by}</h2>
                      </div>
                      <div>
                        <h3>{current_course.data.course.overview}</h3>
                      </div>
                      {isLogged ? (
                        isUserCourse ? null : (
                          <button
                            onClick={() => {
                              onCourseAdd(current_course.data.course.id);
                            }}
                          >
                            Вступить
                          </button>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default connect(
  mapStateToProps("Course"),
  mapDispatchToProps("Course")
)(CSSModules(Course, styles, { allowMultiple: true }));
