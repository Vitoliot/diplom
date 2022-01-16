import React from "react";
import styles from "./Footer.css";
import CSSModules from "react-css-modules";
import {Link} from 'react-router-dom';

const Footer = () => {
    return <footer className="footer" styleName="footer">
        <div className="logo" styleName="logo"> 
            <img src="../../../static/images/logo.svg"></img>
        </div>
        <div className="links" styleName="links">
            <Link to={'/taskCatalog'} styleName='link'> {'К заданиям'}</Link>
            <Link to={'/courseCatalog'} styleName='link'> {'К курсам'}</Link>
        </div>
    </footer>
}


export default CSSModules(Footer, styles, {allowMultiple : true})
// TODO
// Те же ссылки, что и в хедере + Лого; Справа мб ссылки на соц. сети автора