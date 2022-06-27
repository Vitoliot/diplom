import React, { useRef } from "react";
import styles from "./QuestionItem.css";
import CSSModules from "react-css-modules";
import { useDrag, useDrop } from "react-dnd";

const QuestionItem = ({ question, index, isTenThesisDone, moveListItem }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function randomPositions() {
    // let randPosArr = [];
    // for (let i = 0; i < item.questions.length; i++) {
    //   randPosArr.unshift(Math.ceil(Math.random() * 4));
    // }
    // console.log(randPosArr);
    return [0, 8, 3, 5, 3, 5, 8, 0, 2, 6];
  }

  let randomPos = randomPositions();

  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={dragDropRef}
      style={{ opacity: opacity, height: "100%", width: "100%" }}
    >
      <div className="questionContainer" styleName="questionContainer">
        <div>
          <h3>{isTenThesisDone ? question.number : "?"} </h3>
        </div>
        <h3>{question.question}</h3>
      </div>
      <div>
        <form style={{
          display: 'flex',
          'flex-direction': 'column'
        }}>
          {question.posible_answer_1 ? (
            <div
              style={{ order: 2 }}
              styleName={isTenThesisDone ? "incorrect" : "posAnswer"}
            >
              <input
                type="radio"
                name={question.number + " posible_answer_1"}
                value={question.posible_answer_1}
              />
              <label>{question.posible_answer_1}</label>
            </div>
          ) : null}
          {question.posible_answer_2 ? (
            <div
              style={{ order: 4 }}
              styleName={isTenThesisDone ? "incorrect" : "posAnswer"}
            >
              <input
                type="radio"
                name={question.number + " posible_answer_2"}
                value={question.posible_answer_2}
              />
              <label>{question.posible_answer_2}</label>
            </div>
          ) : null}
          {question.answer ? (
            <div
              style={{ order: randomPos[question.number - 1] }}
              styleName={isTenThesisDone ? "correct" : "posAnswer"}
            >
              <input
                type="radio"
                name={question.number + " answer"}
                value={question.answer}
              />
              <label>{question.answer}</label>
            </div>
          ) : null}
          {question.posible_answer_3 ? (
            <div
              style={{ order: 6 }}
              styleName={isTenThesisDone ? "incorrect" : "posAnswer"}
            >
              <input
                type="radio"
                name={question.number + " posible_answer_3"}
                value={question.posible_answer_3}
              />
              <label>{question.posible_answer_3}</label>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default CSSModules(QuestionItem, styles, { allowMultiple: true });
