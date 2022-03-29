import React from "react";
import CSSModules from "react-css-modules";
import styles from "./CourseCard.css";
import { NavLink } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import { connect } from "react-redux";

const CourseCard = (props) => {
  return (
    <div className="container" styleName="container">
      <h1 className="title" styleName="title">
        {props.course.title}
      </h1>
      <div className="author" styleName="author">
        <h3>{props.course.created_by}</h3>
      </div>
      {props.course.usercourse && (
        <div className="pB" styleName="pB">
          <ProgressBar
            count_of_complete_tasks={props.course.count_of_complete_tasks}
            count_of_tasks={props.course.count_of_tasks}
          />
          <h3>
            {"Заданий выполнено:  " + props.course.count_of_complete_tasks}
          </h3>
        </div>
      )}
      <NavLink to="/course">
        <h3
          className="desc"
          styleName="desc"
          onClick={() => {
            props.setCurrent_course({ course: { id: props.course.id } });
          }}
        >
          {props.course.overview.length > 50
            ? props.course.overview.substring(0, 50) + "..."
            : props.course.overview}
        </h3>
      </NavLink>
      <h3>{"Модули:  " + props.course.count_of_modules}</h3>
      <h3>{"Задания:  " + props.course.count_of_tasks}</h3>
      {props.course.usercourse &&
        props.course.count_of_complete_tasks ===
          props.course.count_of_tasks && (
          <div className="usercourseButton" styleName="usercourseButton">
            <NavLink to="/course">
              <button
                onClick={() => {
                  props.setCurrent_course({ course: { id: props.course.id } });
                }}
              >
                {"Закончен"}
              </button>
            </NavLink>
          </div>
        )}
      {props.course.usercourse &&
        !(
          props.course.count_of_complete_tasks === props.course.count_of_tasks
        ) && (
          <div className="usercourseButton" styleName="usercourseButton">
            <NavLink to="/course">
              <button
                onClick={() => {
                  props.setCurrent_course({ course: { id: props.course.id } });
                }}
              >
                {"Продолжить"}
              </button>
            </NavLink>
          </div>
        )}
      {!props.course.usercourse && props.isLogged && (
        <div
          className="courseButton"
          styleName="courseButton"
          onClick={() => {
            props.setCurrent_course({ course: { id: props.course.id } });
          }}
        >
          <NavLink to="/course">
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
      {!props.course.usercourse && !props.isLogged && (
        <div className="courseButton" styleName="courseButton">
          <NavLink to="/course">
            <button
              onClick={() => {
                console.log("link is work");
                props.setCurrent_course({ course: { id: props.course.id } });
              }}
            >
              {" Подробнее "}
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps("CourseCard"),
  mapDispatchToProps("CourseCard")
)(CSSModules(CourseCard, styles, { allowMultiple: true }));
