import React, { useEffect, useState } from "react";
import styles from "./Auth.css";
import Input from "../Input/Input";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

const Auth = ({
  location,
  isLoading,
  isLogged,
  onSignIn,
  onSignUp,
  onError,
}) => {
  const [state, setState] = useState({
    signIn: {
      username: "",
      usernameError: "",
      pass: "",
      passError: "",
    },
    signUp: {
      username: "",
      usernameError: "",
      email: "",
      emailError: "",
      pass: "",
      passError: "",
      rePass: "",
      rePassError: "",
      agreement: false,
    },
  });

  const redirectPath = () => {
    const locationState = location.state;
    const pathname =
      locationState && locationState.from && locationState.from.pathname;
    return pathname || "/profile";
  };

  function validate(action, value) {
    switch (action) {
      case "signUpRePassword": {
        if (state.signUp.pass !== value) return "Пароли не совпадают";
        if (!value) return "Введите значение";
        if (value.length >= 64) return "Не более 64 символов";
        return "";
      }

      case "signInUsername":
      case "signInPassword":
      case "signUpUsername":
      case "signUpPassword":
      case "signUpRePassword": {
        if (!value) return "Введите значение";
        if (value.length >= 64) return "Не более 64 символов";
        return "";
      }

      case "signUpEmail": {
        if (!value) return "Введите значение";
        if (value.length >= 64) return "Не более 64 символов";
        return "";
      }

      case "signIn": {
        return state.signIn.usernameError ||
          state.signIn.passError ||
          !state.signIn.username ||
          !state.signIn.pass
          ? "Не все поля заполнены"
          : "";
      }

      case "signUp": {
        if (!state.signUp.agreement) return "Нет согласия";
        return state.signUp.usernameError ||
          state.signUp.emailError ||
          state.signUp.passError ||
          state.signUp.rePassError ||
          !state.signUp.username ||
          !state.signUp.email ||
          !state.signUp.pass ||
          !state.signUp.rePass
          ? "Не все поля заполнены"
          : "";
      }
    }
  }

  function handleSignInUsernameChange(e) {
    setState(
      Object.assign({}, state, {
        signIn: Object.assign({}, state.signIn, {
          username: e.target.value,
          usernameError: validate("signInUsername", e.target.value),
        }),
      })
    );
  }

  function handleSignInPasswordChange(e) {
    setState(
      Object.assign({}, state, {
        signIn: Object.assign({}, state.signIn, {
          pass: e.target.value,
          passError: validate("signInPassword", e.target.value),
        }),
      })
    );
  }

  function handleSignUpUsernameChange(e) {
    setState(
      Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          username: e.target.value,
          usernameError: validate("signUpUsername", e.target.value),
        }),
      })
    );
  }

  function handleSignUpEmailChange(e) {
    setState(
      Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          email: e.target.value,
          emailError: validate("signUpEmail", e.target.value),
        }),
      })
    );
  }

  function handleSignUpPasswordChange(e) {
    setState(
      Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          pass: e.target.value,
          passError: validate("signUpPassword", e.target.value),
        }),
      })
    );
  }

  function handleSignUpRePasswordChange(e) {
    setState(
      Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          rePass: e.target.value,
          rePassError: validate("signUpRePassword", e.target.value),
        }),
      })
    );
  }

  function handleAgreementClick() {
    setState(
      Object.assign({}, state, {
        signUp: Object.assign({}, state.signUp, {
          agreement: !state.signUp.agreement,
        }),
      })
    );
  }

  function handleSignInTry() {
    let notValid = validate("signIn");
    !notValid ? onSignIn(state.signIn) : onError(notValid);
  }

  function handleSignUpTry() {
    let notValid = validate("signUp");
    !notValid ? onSignUp(state.signUp) : onError(notValid);
  }

  let [activeAction, setActiveAction] = useState("signIn");

  function handleActiveAction(action) {
    return () => setActiveAction(action);
  }

  return (
    <section className="authBack" styleName="authBack">
      {isLogged ? <Redirect to={redirectPath()} /> : null}
      <div className="authContainer" styleName="authContainer">
        <img src="../../../static/images/logo.svg"></img>
        <div className="authHead" styleName="authHead">
          <h3>Авторизация</h3>
          <h3>Регистрация</h3>
        </div>
        <div className="signInInputs" styleName="signInInputs">
          {isLoading && (
            <div className={"userActionLocker"}>
              {SVGManager.getSvg("lockerSvg")}
            </div>
          )}
          <Input
            id={"signInUsername"}
            error={state.signIn.usernameError}
            label={"username/Email"}
            isEmpty={!state.signIn.username}
            onChange={handleSignInUsernameChange}
            onFocus={handleActiveAction("signIn")}
          />
          <Input
            id={"signInPassword"}
            error={state.signIn.passError}
            label={"Password"}
            isEmpty={!state.signIn.pass}
            onChange={handleSignInPasswordChange}
            onFocus={handleActiveAction("signIn")}
            password
          />
          <button
            text={"Sign in"}
            onClick={handleSignInTry}
            style={{ marginTop: "15px" }}
          />
        </div>
        <div className="signUpInputs" styleName="signUpInputs">
          {isLoading && (
            <div className={"userActionLocker"}>
              {SVGManager.getSvg("lockerSvg")}
            </div>
          )}
          <Input
            id={"signUpUsername"}
            error={state.signUp.usernameError}
            label={"username"}
            isEmpty={!state.signUp.username}
            onChange={handleSignUpUsernameChange}
            onFocus={handleActiveAction("signUp")}
          />
          <Input
            id={"signUpEmail"}
            error={state.signUp.emailError}
            label={"emailname"}
            isEmpty={!state.signUp.email}
            onChange={handleSignUpEmailChange}
            onFocus={handleActiveAction("signUp")}
          />
          <Input
            id={"signUpPassword"}
            error={state.signUp.passError}
            label={"Password"}
            isEmpty={!state.signUp.pass}
            onChange={handleSignUpPasswordChange}
            onFocus={handleActiveAction("signUp")}
            password
          />
          <Input
            id={"signUpRePassword"}
            error={state.signUp.rePassError}
            label={"Repeat password"}
            isEmpty={!state.signUp.rePass}
            onChange={handleSignUpRePasswordChange}
            onFocus={handleActiveAction("signUp")}
            password
          />
          <div className="agreementButton" styleName="agreementButton">
            <input
              type="checkbox"
              id="checkbox"
              checked={state.signUp.agreement}
              onChange={handleAgreementClick}
            />
            <label style={{ marginLeft: "10px" }} htmlFor="checkbox">
              {"Я согласен"}
              <Link to={"/terms"}>
                Terms & conditions
              </Link>
            </label>
          </div>
          <button text={"Зарегистрироваться"} onClick={handleSignUpTry} />
        </div>
      </div>
    </section>
  );
};

export default connect(
  mapDispatchToProps("Auth"),
  mapStateToProps("Auth")
)(CSSModules(Auth, styles, { allowMultiple: true }));
