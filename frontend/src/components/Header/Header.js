import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";
import HeaderLink from "./HeaderLink";


const Header = (props) => {
  return (
    <header className="header" styleName="header">
      <div className="logo" styleName="logo">
        <img src="../../../static/images/logo.svg" />
      </div>
      <div>
        <h1 className="pageName" styleName="pageName">
          {props.title}
        </h1>
      </div>
      {props.isLogged ? (
        <div className="links" styleName="links">
          <NavLink to={"/course"}>
            <HeaderLink
              title="мой курс"
              imgPath="../../../static/images/course.svg"
            />
          </NavLink>
          <NavLink to={"/courseCatalog"}>
            <HeaderLink
              title="курсы"
              imgPath="../../../static/images/courseCatalog.svg"
            />
          </NavLink>
          <NavLink to={"/taskCatalog"}>
            <HeaderLink
              title="упражнения"
              imgPath="../../../static/images/task_list.svg"
              />
          </NavLink>
          <NavLink to={"/profile"}>
            <HeaderLink
              title="профиль"
              isProfile={true}
              imgPath={
                props.userImgPath
                  ? '../../../static/' + props.userImgPath
                  : "frontend\\static\\images\\user.svg"
              }
            />
          </NavLink>
        </div>
      ) : (
        <div className="links" styleName="links">
          <NavLink to={"/courseCatalog"}>
            <HeaderLink
              title="курсы"
              imgPath="../../../static/images/courseCatalog.svg"
            />
          </NavLink>
          <NavLink to={"/taskCatalog"}>
            <HeaderLink
              title="упражнения"
              imgPath="../../../static/images/task_list.svg"
            />
          </NavLink>
          <button styleName="authLink">
          <NavLink to={"/login"}>
            <h3>
            {"вход"}
            </h3>
          </NavLink>
          </button>
        </div>
      )}
    </header>
  );
};

export default connect(
  mapStateToProps("Header"),
  mapDispatchToProps("Header")
)(CSSModules(Header, styles, { allowMultiple: false }));
// CSSModules(Header, styles, { allowMultiple: true });
