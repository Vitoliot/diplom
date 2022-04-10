import React from "react";
import styles from "./TaskCard.css";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import mapDispatchToProps from "../../store/mapDispatchToProps";

const TaskCard = (props) => {
  console.log(props.task);
  return props.task ? (
    <div className="container" styleName="container">
      <h1> {props.task.title}</h1>
      <p>{props.task.overview}</p>
      <p>
        <span>Тип:</span>
        {props.task.type}
      </p>
      <p>
        <span>Тема:</span>
        {props.task.theme}
      </p>
      <p>
        <span>Автор:</span>
        {props.task.created_by}
      </p>
      <Link to={"/exercise"}>
        <button
          onClick={(e) => {
            props.onChangeCurrentTask(props.task);
          }}
        >
          Попрактиковаться
        </button>
      </Link>
    </div>
  ) : (
    <></>
  );
};
// TODO
// Карточка задания
// Получение инфы как входные данные функции
export default connect(
  null,
  mapDispatchToProps("TaskCard")
)(CSSModules(TaskCard, styles, { allowMultiple: true }));
