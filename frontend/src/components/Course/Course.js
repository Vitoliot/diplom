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
  let [currModule, setCurrModule] = useState(-1);
  let [isUserCourse, setIsUserCourse] = useState(false);
  let [nextTask, setNextTask] = useState({});

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
    setIsUserCourse(current_course.data.hasOwnProperty("usertasks"));
    if (isUserCourse) {
      indexesOfCompleteTasks = defineIndexesOfCompleteTasks();
      setAmountOfCompleteTasks(
        defineNumOfCompleteTasks(indexesOfCompleteTasks)
      );
      setNextTask(findNextTask(indexesOfCompleteTasks));
    }
    if (nextTask) onChangeCurrentTask(nextTask);
    console.log(
      isUserCourse,
      indexesOfCompleteTasks,
      amountOfCompleteTasks,
      nextTask
    );
  });

  console.log("tct", todayCompleteTasks, taskInDay);

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
    let nextTask = null;
    let modules = current_course.data.course.modules;
    modules.forEach((element) => {
      element.moduletasks.every((element) => {
        if (!indexesOfCompleteTasks.includes(element.task.id)) {
          nextTask = element.task;
          return false;
        }
        return true;
      });
    });
    return nextTask;
  }

  console.log(current_course);
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
                      count_of_complete_tasks={
                        5
                      }
                      count_of_tasks={5}
                      // count_of_complete_tasks={
                      //   current_course.data.count_of_complete_tasks
                      // }
                      // count_of_tasks={current_course.data.count_of_tasks}
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
                      nextTask.hasOwnProperty("task") ? (
                        <div>
                          <h2>{nextTask.task.title}</h2>
                          <span>{nextTask.task.overview}</span>
                          <Link to="/exercise">
                            <button>Приступить</button>
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
                        isUserCourse ? (
                          null) : (
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
