import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./CourseCatalog.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

const CourseCatalog = (props) => {
  useEffect(() => {
    if (
      (props.course_choicePage.courses.length === 0 ||
        props.course_sort.is_changed) &&
      !props.course_choicePage.is_loading
    ) {
      if (props.isLogged) props.on_init_authorize();
      else props.on_init();
    }
    if (props.course_choicePage.usercourses) usercoursesResponse();
  });

  console.log(props.course_choicePage.usercourses);

  function usercoursesResponse() {
    props.course_choicePage.courses.forEach((element) => {
      element.count_of_complete_tasks = 0;
      element.usercourse = false;
      for (
        let index = 0;
        index < props.course_choicePage.usercourses.length;
        index++
      ) {
        if (props.course_choicePage.usercourses[index].course == element.id) {
          element.count_of_complete_tasks =
            props.course_choicePage.usercourses[index].count_of_complete_tasks;
          element.usercourse = true;
        }
      }
    });
  }

  useEffect(() => {
    document.getElementById("defaultSort").selected = true;
    let sort_params = props.course_sort;
    if (sort_params.date) {
      document.getElementById("dateSort").selected = true;
    }
    if (sort_params.alphabet) {
      document.getElementById("titleSort").selected = true;
    }
    if (sort_params.rule) {
      document.getElementById("downRule").selected = true;
    } else {
      document.getElementById("upRule").selected = true;
    }
    if (props.course_choicePage.usercourses) usercoursesResponse();
  });

  return (
    <section>
      <Header title="Каталог курсов"></Header>
      <div className="coursesSortParent" styleName="coursesSortParent">
        <div className="coursesSort" styleName="coursesSort">
          <h5>Курсы</h5>
          <div>
            <h5 for="sortParam"> Сортировать по: </h5>
            <select
              className="sortParam"
              onChange={(event) => {
                let sort_params = {
                  date: false,
                  alphabet: false,
                  rule: props.course_sort.rule,
                  is_changed: true,
                };
                if (event.target.selectedIndex === 1) {
                  sort_params.date = true;
                }
                if (event.target.selectedIndex === 2) {
                  sort_params.alphabet = true;
                }
                props.apply_course_choicePage_sort(sort_params);
              }}
            >
              <option id="defaultSort">{"по умолчанию"}</option>
              <option id="dateSort">{"по дате"}</option>
              <option id="titleSort">{"по названию"}</option>
            </select>
            <label for="sortRule"></label>
            <select
              className="sortRule"
              onChange={(event) => {
                let sort_params = {
                  date: props.course_sort.date,
                  alphabet: props.course_sort.alphabet,
                  rule: false,
                  is_changed: true,
                };
                if (event.target.selectedIndex === 1) {
                  sort_params.rule = true;
                }
                props.apply_course_choicePage_sort(sort_params);
              }}
            >
              <option id="upRule">{"по возрастанию"}</option>
              <option id="downRule">{"по убыванию"}</option>
            </select>
            <h5>
              <button
                className="breakButton"
                onClick={() => {
                  props.break_course_choicePage_sort();
                }}
              >
                {"Сброс"}
              </button>
            </h5>
          </div>
        </div>
        <div className="container" styleName="container">
          <div className="courses" styleName="courses">
            {props.course_choicePage.courses.map((element) => (
              <CourseCard course={element}></CourseCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(
  mapStateToProps("CourseCatalog"),
  mapDispatchToProps("CourseCatalog")
)(CSSModules(CourseCatalog, styles, { allowMultiple: true }));
