import React from "react";
// import {NavLink} from 'react-router-dom';
// import styles from '../../../static/css/Header.css';


// TODO
// Структура для авторизованного: ЛОГО, Название страницы, Курсы, Упражнения, Профиль (с картинкой)
// Структура для не авторизованного: ЛОГО, Название страницы, Курсы, Упражнения, Авторизоваться
// Входные данные: название странницы
// Проверять авторизованность по куки или по state

const Header = (props) => (
<h1> {props.title} </h1>
);

export default Header;