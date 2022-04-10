import React from "react";
import styles from "./Timer.css";
import CSSModules from "react-css-modules";

const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  return `${getMinutes} : ${getSeconds}`;
};

const Timer = ({time}) => {
  return (
      <div styleName="timerContainer">
        <p>{formatTime(time)}</p>
      </div>
  );
};

export default CSSModules(Timer, styles, {allowMultiple:true})
