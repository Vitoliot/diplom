import React from "react";
import Header from '../Header/Header.js';
import TascCard from "../TaskCard/TaskCard";
import TaskAcordion from "../TaskAccordion/TaskAccordion";
import TaskSwitch from "../TaskSwitch/TaskSwitch";
import styles from "./TaskCatalog.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

const TaskCatalog = (props) => {
  let taskTheme = props.current_task_by_theme_and_id
    ? props.current_task_by_theme_and_id[0]
    : null;
  let taskID = props.current_task_by_theme_and_id
    ? props.current_task_by_theme_and_id[1]
    : null;
  function onTaskClick(e) {
    var theme =
      e.target.parentNode.parentNode.previousSibling.lastChild.innerText;
    var taskTitle = e.target.innerText;
    for (let index = 0; index < props.tasks.length; index++) {
      if (props.is_theme ? (props.tasks[index].task[0].theme) : (props.tasks[index].task[0].type)  === theme) {
        taskTheme = index;
        taskID = props.tasks[index].task.findIndex((element) => {
          return element.title === taskTitle;
        });
        props.on_apply_task_choicePage_task([taskTheme, taskID]);
      } else continue;
    }
  }
  if ((props.tasks.length === 0 && !props.is_loading) || props.is_changed)
    props.on_init();
  return (
    <section>
        <Header title="Каталог упражнений"></Header>
      <div className="taskSwitch" styleName="taskSwitch">
        <h5>Упражнения</h5>
        <TaskSwitch
          onClick={props.on_apply_task_choicePage_filters}
          isTheme={props.is_theme}
        />
      </div>
      <div className="container" styleName="container">
        <div className="tasks" styleName="tasks">
          {props.tasks.map((theme) => (
            <TaskAcordion
              theme={theme}
              onTaskClick={onTaskClick}
              isTheme={props.is_theme}
            ></TaskAcordion>
          ))}
        </div>
        <div className="taskCard" styleName="taskCard">
          <TascCard
            task={
              taskTheme !== null && taskID !== null && props.tasks[taskTheme]
                ? props.tasks[taskTheme].task[taskID]
                : null
            }
          />
        </div>
      </div>
    </section>
  );
};

export default connect(
  mapStateToProps("TaskCatalog"),
  mapDispatchToProps("TaskCatalog")
)(CSSModules(TaskCatalog, styles, { allowMultiple: true }));
