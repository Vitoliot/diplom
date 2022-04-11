import React from "react";
import styles from "./TaskChoiceCard.css";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

const TaskChoiceCard = ({ task, index, onChangeCurrentTask }) => {
  return (
    <div styleName="taskChoiceCard">
      <h1>{task.title}</h1>
      <h2>{task.created_by}</h2>
      <h3>{task.overview}</h3>
      {task.isOnSite ? (
        <Link to={"/exercise"} style={{'margin':'auto'}}>
          <button
            onClick={() => {
              onChangeCurrentTask(task.id);
            }}
          >
            {"Попрактиковаться"}
          </button>
        </Link>
      ) : null}
    </div>
  );
};

// export default connect(
//     mapStateToProps("TaskChoiceCard"),
//     mapDispatchToProps("TaskChoiceCard")
//   )
export default CSSModules(TaskChoiceCard, styles, { allowMultiple: true });
