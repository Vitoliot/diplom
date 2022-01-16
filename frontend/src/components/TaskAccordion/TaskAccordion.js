import React from "react";
import styles from "./TaskAccordion.css";
import CSSModules from "react-css-modules";

const TaskAcordion = (props) => {
    function accordionOn(target) {
        var pan = target.nextElementSibling
        var accordSrc = target.firstChild
        if (pan.style.maxHeight) {
          pan.style.maxHeight = null;
          accordSrc.src = '../../../static/images/dropdown.svg'
        } else {
          pan.style.maxHeight = pan.scrollHeight + "px";
          accordSrc.src = '../../../static/images/dropup.svg'
        }
    }
  let tasks =
    props.theme.task !== undefined ? props.theme.task : [{ title: "нет" }];
  return (
    <>
      <button styleName="accordion" className="accordion" onClick={(e) => (accordionOn(e.target))}>
        <img src='../../../static/images/dropdown.svg' width={50} height={50} color="#908373" overflow={'visible'}/>
          <h3 onClick={(e) => (accordionOn(e.target.parentNode))}>
            {tasks[0].title !== "нет" ? (props.isTheme ? tasks[0].theme : tasks[0].type) : "нетdsajd.as"}
          </h3>
      </button>
      <div styleName="panel" className="panel">
        {tasks.map((element) => (
          <div onClick={(e) => props.onTaskClick(e)}>
            <img src='../../../static/images/dropleft.svg' width={25} height={25} color="#908373" overflow={'visible'}/>
            <h4>
            {element.title} 
            </h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default CSSModules(TaskAcordion, styles, {allowMultiple: true} );
