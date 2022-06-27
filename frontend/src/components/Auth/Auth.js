import React, { useEffect, useState } from "react";
import styles from "./Auth.css";
import Input from "../Input/Input";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";
import { Navigate } from "react-router";
import ReactLoading from "react-loading";

const Auth = ({ isLoading, isLogged, onSignIn, onSignUp, onError }) => {
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

  let [activeAction, setActiveAction] = useState("Sign in");

  function handleActiveAction(action) {
    return () => setActiveAction(action);
  }

  return (
    <section className="authBack" styleName="authBack">
      {isLogged ? (
        <Navigate to="/" />
      ) : (
        <div className="authContainer" styleName="authContainer">
          {/* <img src="../../../static/images/auth_backend_image.png" height={720} width={1510}></img> */}
          <div>
            <img src="../../../static/images/logo.svg"></img>
            <div className="authHead" styleName="authHead">
              <h3 onClick={handleActiveAction("Sign in")}>Авторизация</h3>
              <h3 onClick={handleActiveAction("Sign up")}>Регистрация</h3>
            </div>
            {activeAction === "Sign in" && (
              <div className="signInInputs" styleName="signInInputs">
                {isLoading && (
                  <div style={{ display: "flex", color: "ebe2ca" }}>
                    <div style={{ margin: "auto" }}>
                      <ReactLoading
                        height={"50px"}
                        width={"50px"}
                        color="#908373"
                        type="spin"
                      />
                    </div>
                  </div>
                )}
                <Input
                  id={"signInUsername"}
                  error={state.signIn.usernameError}
                  label={"никнейм"}
                  isEmpty={!state.signIn.username}
                  onChange={handleSignInUsernameChange}
                  // onFocus={handleActiveAction("signIn")}
                />
                <Input
                  id={"signInPassword"}
                  error={state.signIn.passError}
                  label={"пароль"}
                  isEmpty={!state.signIn.pass}
                  onChange={handleSignInPasswordChange}
                  // onFocus={handleActiveAction("signIn")}
                  password
                />
                <button
                  styleName="goButton"
                  text={"Sign in"}
                  onClick={handleSignInTry}
                  style={{ marginTop: "15px" }}
                >
                  {"Войти"}
                </button>
              </div>
            )}
            {activeAction === "Sign up" && (
              <div className="signUpInputs" styleName="signUpInputs">
                {isLoading && (
                  <div style={{ display: "flex", color: "ebe2ca" }}>
                    <div style={{ margin: "auto" }}>
                      <ReactLoading
                        height={"50px"}
                        width={"50px"}
                        color="#908373"
                        type="spin"
                      />
                    </div>
                  </div>
                )}
                <Input
                  id={"signUpUsername"}
                  error={state.signUp.usernameError}
                  label={"никнейм"}
                  isEmpty={!state.signUp.username}
                  onChange={handleSignUpUsernameChange}
                  // onFocus={handleActiveAction("signUp")}
                />
                <Input
                  id={"signUpEmail"}
                  error={state.signUp.emailError}
                  label={"email"}
                  isEmpty={!state.signUp.email}
                  onChange={handleSignUpEmailChange}
                  // onFocus={handleActiveAction("signUp")}
                />
                <Input
                  id={"signUpPassword"}
                  error={state.signUp.passError}
                  label={"пароль"}
                  isEmpty={!state.signUp.pass}
                  onChange={handleSignUpPasswordChange}
                  // onFocus={handleActiveAction("signUp")}
                  password
                />
                <Input
                  id={"signUpRePassword"}
                  error={state.signUp.rePassError}
                  label={"пароль"}
                  isEmpty={!state.signUp.rePass}
                  onChange={handleSignUpRePasswordChange}
                  // onFocus={handleActiveAction("signUp")}
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
                    {"Cогласен c "}
                    <Link to={"/terms"}>условиями</Link>
                  </label>
                </div>
                <button styleName="goButton" onClick={handleSignUpTry}>
                  {"Зарегистрироваться"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default connect(
  mapStateToProps("Auth"),
  mapDispatchToProps("Auth")
)(CSSModules(Auth, styles, { allowMultiple: true }));
