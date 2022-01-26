import React from "react";
import Header from "../Header/Header";
import CourseCard from "../CourseCard/CourseCard"
import styles from "./CourseCatalog.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

// TODO
// Вывод всех курсов
// Если выводятся пользовательские курсы, то отображать прогресс-бар (написать компонент прогресс-бара)
// Написать бэкенд чекпоинт на получение курсов, отсортированных по дате 
// Написать бэкенд чекпоинт на получение курсов, отсортированных по теме 
// Получать курсы через state 
// Написать компонент-карточку курса

const CourseCatalog = (props) => {
    return <section>
        <Header title='Каталог курсов'></Header>
    </section>
}

export default connect(
    mapStateToProps('CourseCatalog'),
    mapDispatchToProps('CourseCatalog'))
    (CSSModules(CourseCatalog, styles, {allowMultiple:true}))