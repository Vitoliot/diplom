import React from "react";
import { useState } from "react";
import mapStateToProps from "../../../store/mapStateToProps";
import ExerciseTest from "../ExerciseTest/ExerciseTest";
import styles from "./ExerciseText.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/mapDispatchToProps";
import TenThesis from "../TenThesis/TenThesis";

import { Link } from "react-router-dom";

const ExerciseText = ({ item, time, QERTest, LMTest, isParam }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExerciseTest, setIsExerciseTest] = useState(false);
  console.log(item);
  let maxPage = 1;
  let textParts = [];

  function divideTextToPage(text) {
    let divVal = 2500;
    if (text.length > divVal) {
      let iMax =
        text.length % divVal === 0
          ? (text.length - (text.length % divVal)) / divVal
          : (text.length - (text.length % divVal)) / divVal + 1;
      maxPage = iMax != 0 ? iMax : 1;
      for (let i = 0; i < iMax; i++) {
        textParts.push(
          text.slice(
            i * divVal,
            (i + 1) * divVal > text.length ? text.length : (i + 1) * divVal
          )
        );
      }
    } else {
      textParts.push(text);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleDoneButton() {
    setIsExerciseTest(true);
  }
  function getAmountOfWords(string) {
    return string.split(" ").length;
  }
  divideTextToPage(item.content);
  return isExerciseTest ? (
    LMTest ? (
      <TenThesis time={time} isParam={isParam}></TenThesis>
    ) : (
      <ExerciseTest
        QERTest={QERTest}
        time={time}
        words={getAmountOfWords(item.content)}
        isParam={isParam}
      ></ExerciseTest>
    )
  ) : (
    <div className="exerciseTextParent" styleName="exerciseTextParent">
      <div className="exerciseTextContainer" styleName="exerciseTextContainer">
        <div>
          <h2> {item.title} </h2>
          <div
            className="currentPageContainer"
            styleName="currentPageContainer"
          >
            <h3>{currentPage + "/" + maxPage}</h3>
          </div>
        </div>
        <div className="textContainer" styleName="textContainer">
          <span>{textParts[currentPage - 1]}</span>
        </div>
        <div>
          <button
            onClick={handleDoneButton}
            className="doneButton"
            styleName="doneButton"
          >
            {"Готово"}
          </button>
          <div className="changeButton" styleName="changeButton">
            <button onClick={handlePreviousPage}>
              <img
                src="../../../../static/images/dropright.svg"
                width={24}
                height={32}
                color="#EBE2CA"
              ></img>
            </button>
            <button onClick={handleNextPage}>
              <img
                src="../../../../static/images/dropleftc.svg"
                width={24}
                height={32}
                color="#EBE2CA"
              ></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("ExerciseText"),
  mapDispatchToProps("ExerciseText")
)(CSSModules(ExerciseText, styles, { allowMultiple: true }));
