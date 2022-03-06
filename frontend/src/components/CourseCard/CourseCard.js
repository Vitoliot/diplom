import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./CourseCard.css";
import { NavLink } from "react-router-dom";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { connect } from "react-redux";

const CourseCard = (props) => {
  const [current_course, setCurrent_course] = useState(0);
  return (
    <div className="container" styleName="container">
      <h1 className="title" styleName="title">
        {props.course.title}
      </h1>
      <div className="author" styleName="author">
        <h3>{props.course.created_by}</h3>
      </div>
      {props.course.usercourse && (<div>
        <div className="progressBar" styleName="progressBar">
          <div
            className="progress-value"
            styleName="progress-value"
            style={{
              width:
                props.course.count_of_complete_tasks /
                  props.course.count_of_tasks +
                "%",
            }}
          ></div>
        </div>
        <h3>{"Заданий выполнено:  " + props.course.count_of_complete_tasks}</h3>
      </div>)}
      <NavLink
        to="/course"
        onClick={() => {
          setCurrent_course({ id: props.course.id });
        }}
      >
        <h3 className="desc" styleName="desc">
          {props.course.overview.length > 100
            ? props.course.overview.substr(100) + "..."
            : props.course.overview}
        </h3>
      </NavLink>
      <h3>{"Модули:  " + props.course.count_of_modules}</h3>
      <h3>{"Задания:  " + props.course.count_of_tasks}</h3>
      {props.course.usercourse && (
        <div className="usercourseButton" styleName="usercourseButton">
          <NavLink
            to="/course"
            onClick={() => {
              setCurrent_course({ id: props.course.id });
            }}
          >
            <button>{"Продолжить"}</button>
          </NavLink>
        </div>
      )}
      {!props.course.usercourse && (
        <div className="courseButton" styleName="courseButton">
          <NavLink
            to="/course"
            onClick={() => {
              setCurrent_course({ id: props.course.id });
            }}
          >
            <button
              onClick={() => {
                props.on_course_add(props.course.id);
              }}
            >
              {" Записаться "}
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps("CourseCard"))(
  CSSModules(CourseCard, styles, { allowMultiple: true })
);
