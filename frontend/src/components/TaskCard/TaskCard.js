import React from "react";
import styles from './TaskCard.css';
import CSSModules from "react-css-modules";

const TaskCard = (props) => {
    return props.task ? (
        <div className="container" styleName="container">
            <h1> {props.task.title}</h1>
            <p>
                {props.task.overview}
            </p>
            <p>
                <span>    
                Тип: 
                </span>
                {props.task.type}
            </p>
            <p>
                <span>
                Тема: 
                </span>
                 {props.task.theme}
            </p>
            <p>
                <span>
                Автор: 
                </span>
                {props.task.created_by}
            </p>
            <button onClick={(e) => {alert('clicked')}}>Попрактиковаться</button>
        </div>
    ) : <></>
} 
// TODO
// Карточка задания
// Получение инфы как входные данные функции
export default CSSModules(TaskCard, styles, {allowMultiple : true});