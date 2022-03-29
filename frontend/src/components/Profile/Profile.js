import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar, Line } from "react-chartjs-2";
import ReactLoading from "react-loading";
import { Navigate } from "react-router";
import styles from "./Profile.css";
import Header from "../Header/Header";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";
import Select from "../Select/Select";

const Profile = ({
  fetсhUserParameters,
  fetchUserAnswers,
  updateUserData,
  updateUserPassword,
  updateUserIcon,
  deleteUser,
  logoutUser,
  addSuccess,
  user_for_profile,
  user_params,
  user_answers,
}) => {
  const [profileSettings, setProfileSettings] = useState({
    isEditing: false,
    isBringable: false,
  });

  const [statValue, setStatValue] = useState(0);
  const [profileIcon, setProfileIcon] = useState({
    icon: user_for_profile.data.icon,
  });
  const [profileObject, setProfileObject] = useState({
    username: user_for_profile.data.username,
    first_name: user_for_profile.data.first_name,
    last_name: user_for_profile.data.last_name,
    email: user_for_profile.data.email,
    task_in_day: user_for_profile.data.task_in_day,
  });
  const [passObject, setPassObject] = useState({
    oldPass: "",
    pass: "",
    rePass: "",
    delPass: "",
  });
  const [inputErrors, setInputErrors] = useState({
    usernameError: "",
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    iconError: "",
    passError: "",
    rePassError: "",
    oldPassError: "",
    delPassError: "",
  });

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    BarElement
  );

  const Translator = {
    BOFI: "ШУЗ",
    VM: "ЗП",
    VMWP: "ЗПСП",
    LM: "ЛП",
    AA: "КВ",
    QER: "КЭЧ",
  };

  let radarOptions = {};

  let radarData = {};

  function constructRadarData() {
    let radarKeys = [];
    let radarValues = [];

    for (const key in user_params.data) {
      if (Object.hasOwnProperty.call(user_params.data, key)) {
        radarKeys.unshift(Translator[key]);
        let rvalue = user_params.data[key].length
          ? user_params.data[key][0].value
          : 0;
        radarValues.unshift(rvalue);
      }
    }
    return {
      labels: radarKeys,
      datasets: [
        {
          label: "пунктов",
          data: radarValues,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }
  let statsData = {};

  function constructStatsData() {
    let statLabel = [];
    let statData = [];
    let choice = Object.keys(user_params.data)[statValue];

    user_params.data[choice]
      ? user_params.data[choice].forEach((element) => {
          statLabel.unshift(
            new Date(element.date_init).toLocaleDateString("ru")
          );
          statData.unshift(element.value);
        })
      : null;

    statLabel.unshift("2022-01-01");
    statData.unshift(0);
    return {
      labels: statLabel,
      datasets: [
        {
          label: Translator[choice],
          data: statData.length ? statData : [],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }

  if (!user_for_profile.data.id) return <Navigate to="/login"></Navigate>;

  if (!user_params.isLoading && !user_params.isFetched) {
    fetсhUserParameters();
  }
  if (user_params.data.hasOwnProperty("BOFI")) {
    statsData = constructStatsData();
  }

  function handleEditingButton() {
    setProfileSettings(
      Object.assign({}, profileSettings, {
        isEditing: !profileSettings.isEditing,
      })
    );
  }

  function handleBringableButton() {
    setProfileSettings(
      Object.assign({}, profileSettings, {
        isBringable: !profileSettings.isBringable,
      })
    );
    addSuccess(
      profileSettings.isBringable
        ? "Уведомления выключены"
        : "Уведомления включены"
    );
  }

  function validate(action, value) {
    switch (action) {
      case "profileIcon": {
        return profileIcon.icon;
      }

      case "profileData": {
        return (
          !inputErrors.usernameError &&
          !inputErrors.first_nameError &&
          !inputErrors.last_nameError &&
          !inputErrors.emailError
        );
      }

      case "profilePassword": {
        return (
          !inputErrors.rePassError &&
          !inputErrors.passError &&
          !inputErrors.oldPassError
        );
      }
      case "oldPassEdit": {
        if (value.length > 64) return "Длина более 64 символов";
        if (!value) return "Введите значение";
        return "";
      }

      case "first_nameEdit": {
        if (value.length > 64) return "Длина более 64 символов";
        return "";
      }
      case "last_nameEdit": {
        if (value.length > 64) return "Длина более 64 символов";
        return "";
      }

      case "usernameEdit": {
        if (!value) return "Введите значение";
        if (value.length > 64) return "Длина более 64 символов";
        return "";
      }
      case "emailEdit": {
        if (!value) return "Введите значение";
        if (value.length > 64) return "Длина более 64 символов";
        return "";
      }

      case "rePassEdit": {
        if (!value) return "Введите значение";
        if (value.length > 64) return "Длина более 64 символов";
        if (passObject.pass !== value) return "Пароли не одинаковые";
        return "";
      }

      case "passEdit": {
        if (!value) return "Введите значение";
        if (value.length > 64) return "Длина более 64 символов";
        if (passObject.pass === passObject.oldPass)
          return "Новый пароль должен отличаться от старого";
        return "";
      }

      case "delPassEdit": {
        if (!value) return "Введите значение";
        if (value.length > 64) return "Длина более 64 символов";
        return "";
      }
      default: {
        return "";
      }
    }
  }

  function handleEmailChange(e) {
    setProfileObject(
      Object.assign({}, profileObject, { email: e.target.value })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        emailError: validate("emailEdit", e.target.value),
      })
    );
    user_for_profile.data.email = e.target.value;
  }

  function handleFirst_NameChange(e) {
    setProfileObject(
      Object.assign({}, profileObject, { first_name: e.target.value })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        first_nameError: validate("first_nameEdit", e.target.value),
      })
    );

    user_for_profile.data.first_name = e.target.value;
  }

  function handleLast_NameChange(e) {
    setProfileObject(
      Object.assign({}, profileObject, { last_name: e.target.value })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        last_nameError: validate("last_nameEdit", e.target.value),
      })
    );

    user_for_profile.data.last_name = e.target.value;
  }

  function handleUsernameChange(e) {
    setProfileObject(
      Object.assign({}, profileObject, { username: e.target.value })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        usernameError: validate("usernameEdit", e.target.value),
      })
    );
    user_for_profile.data.username = e.target.value;
  }

  function handleTaskInDayChange(e) {
    setProfileObject(
      Object.assign({}, profileObject, {
        task_in_day: 5 + e.target.selectedIndex * 2,
      })
    );

    user_for_profile.data.task_in_day = 5 + e.target.selectedIndex * 2;
  }

  function handleStatChange(e) {
    setStatValue(e.target.selectedIndex);
  }

  function handleIconPathChange(e) {
    let url = user_for_profile.data.icon.split("/");
    let res_url = "";
    let ic_url = e.target.value.split("\\");
    url.forEach((part) => {
      if (part !== url[url.length - 1]) {
        res_url += part + "/";
      } else {
        res_url += ic_url[ic_url.length - 1];
      }
    });
    setProfileIcon(
      Object.assign({}, profileIcon, {
        icon: e.target.files[0],
        iconPath: res_url,
      })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        iconError: validate("iconEdit", res_url),
      })
    );
  }

  function handleOldPassPasswordChange(e) {
    setPassObject(
      Object.assign({}, profileObject, { oldPass: e.target.value })
    );
    setInputErrors(
      Object.assign({}, inputErrors, {
        oldPassError: validate("oldPassEdit", e.target.value),
      })
    );
  }

  function handlePassPasswordChange(e) {
    setPassObject(Object.assign({}, passObject, { pass: e.target.value }));
    setInputErrors(
      Object.assign({}, inputErrors, {
        passError: validate("passEdit", e.target.value),
      })
    );
  }

  function handlePassRePasswordChange(e) {
    setPassObject(Object.assign({}, passObject, { rePass: e.target.value }));
    setInputErrors(
      Object.assign({}, inputErrors, {
        rePassError: validate("rePassEdit", e.target.value),
      })
    );
  }
  function handlePassDelPasswordChange(e) {
    setPassObject(Object.assign({}, passObject, { delPass: e.target.value }));
    setInputErrors(
      Object.assign({}, inputErrors, {
        delPassError: validate("delPassEdit", e.target.value),
      })
    );
  }

  function handleSaveProfileData() {
    if (validate("profileData")) {
      updateUserData(profileObject);
    }
  }

  function handleSaveProfileIcon() {
    if (validate("profileIcon")) {
      user_for_profile.data.icon = profileIcon.iconPath;
      updateUserIcon({ icon: profileIcon.icon });
    }
  }

  function handleSaveProfilePassword() {
    if (validate("profilePassword")) {
      updateUserPassword(passObject.oldPass, passObject.pass);
      setPassObject(
        Object.assign({}, passObject, {
          oldPass: "",
          pass: "",
          rePass: "",
        })
      );
    }
  }

  return (
    <section>
      <Header title="Профиль" />
      <div
        className="parentProfileContainer"
        styleName="parentProfileContainer"
      >
        {!profileSettings.isEditing ? (
          <div className="userDataContainer" styleName="userDataContainer">
            <div className="iconData" styleName="iconData">
              <img
                src={user_for_profile.data.icon}
                width={150}
                height={150}
              ></img>
              <h3>{profileObject.username}</h3>
            </div>
            <div className="userData" styleName="userData">
              {profileObject.first_name && (
                <div className="first_NameData" styleName="first_NameData">
                  <h3> Имя </h3>
                  <span> {profileObject.first_name}</span>
                </div>
              )}
              {profileObject.last_name && (
                <div className="last_NameData" styleName="last_NameData">
                  <h3> Фамилия </h3>
                  <span> {profileObject.last_name}</span>
                </div>
              )}
              <div className="emailData" styleName="emailData">
                <h3> Email </h3> <span> {profileObject.email}</span>
              </div>
              <div className="taskInDayData" styleName="taskInDayData">
                <h3> Заданий в день </h3>
                <span> {profileObject.task_in_day}</span>
              </div>
            </div>
            <div className="buttonsInUserData" styleName="buttonsInUserData">
              <button
                onClick={() => {
                  handleBringableButton();
                }}
              >
                {profileSettings.isBringable ? (
                  <img
                    src="../../../static/images/bring_on.svg"
                    width={40}
                    height={40}
                  />
                ) : (
                  <img
                    src="../../../static/images/bring_off.svg"
                    width={40}
                    height={40}
                  />
                )}
              </button>
              <button
                onClick={() => {
                  handleEditingButton();
                }}
              >
                <img
                  src="../../../static/images/edit.svg"
                  width={40}
                  height={40}
                />
              </button>
              <button
                onClick={() => {
                  logoutUser();
                }}
              >
                <img
                  src="../../../static/images/exit.svg"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="userEditDataContainer"
            styleName="userEditDataContainer"
          >
            <div className="imageUpdate" styleName="imageUpdate">
              <img
                src={user_for_profile.data.icon}
                width={150}
                height={150}
              ></img>
              <input
                type="file"
                name="upload"
                accept=".jpeg, .png"
                onChange={(e) => handleIconPathChange(e)}
              ></input>
              <button
                onClick={() => {
                  handleSaveProfileIcon();
                }}
              >
                Сменить аватар
              </button>
              <div className="usernameUpdate" styleName="usernameUpdate">
                <h3> Никнейм </h3>
                <Input
                  id={"username"}
                  label={""}
                  error={inputErrors.usernameError}
                  value={profileObject.username}
                  onChange={handleUsernameChange}
                  readonly={false}
                />
              </div>
            </div>
            <div className="userDataUpdatePart" styleName="userDataUpdatePart">
              <div className="udup1" styleName="udup1">
                <div className="first_nameUpdate" styleName="first_nameUpdate">
                  <h3> Имя</h3>
                  <Input
                    id={"first_name"}
                    error={inputErrors.first_nameError}
                    label={""}
                    value={profileObject.first_name}
                    onChange={handleFirst_NameChange}
                  />
                </div>
                <div className="last_nameUpdate" styleName="last_nameUpdate">
                  <h3> Фамилия </h3>
                  <Input
                    id={"last_name"}
                    label={""}
                    error={inputErrors.last_nameError}
                    value={profileObject.last_name}
                    onChange={handleLast_NameChange}
                  />
                </div>
                <div className="emailUpdate" styleName="emailUpdate">
                  <h3> Email </h3>
                  <Input
                    id={"email"}
                    label={""}
                    error={inputErrors.emailError}
                    value={profileObject.email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div className="udup2" styleName="udup2">
                <div className="taskInDayUpdate" styleName="taskInDayUpdate">
                  <h3> Дневная нагрузка </h3>
                  <div>
                    <Select
                      id={"task_in_day"}
                      value={profileObject.task_in_day}
                      values={["Малая", "Средняя", "Большая"]}
                      onChange={handleTaskInDayChange}
                    />
                    <button className="helpButton" styleName="helpButton">
                      <img
                        src="../../../static/images/question.svg"
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="submitUserDataButton"
                styleName="submitUserDataButton"
                onClick={() => {
                  handleSaveProfileData();
                }}
              >
                Подтвердить изменения
              </button>
            </div>
            <div className="delPassData" styleName="delPassData">
              <h3>Удалить аккаунт</h3>
              <Input
                id={"passDel"}
                label={"пароль"}
                error={inputErrors.delPassError}
                isEmpty={!passObject.delPass}
                value={passObject.delPass}
                onChange={handlePassDelPasswordChange}
                password
              />
              <button
                styleName="deleteUserDataButton"
                onClick={() => {
                  if (confirm("Вы уверены?")) deleteUser(passObject.delPass);
                }}
              >
                Удалить аккаунт
              </button>
            </div>
            <div className="passPart" styleName="passPart">
              <div className="pp1" styleName="pp1">
                <div className="oldPassData" styleName="oldPassData">
                  <h3> Старый пароль</h3>
                  <Input
                    id={"oldPassPass"}
                    label={""}
                    error={inputErrors.oldPassError}
                    isEmpty={!passObject.oldPass}
                    value={passObject.oldPass}
                    onChange={handleOldPassPasswordChange}
                    password
                  />
                </div>
                <div className="passData" styleName="passData">
                  <h3>Новый пароль</h3>
                  <Input
                    id={"passPass"}
                    label={""}
                    error={inputErrors.passError}
                    isEmpty={!passObject.pass}
                    value={passObject.pass}
                    onChange={handlePassPasswordChange}
                    password
                  />
                </div>
                <div className="rePassData" styleName="rePassData">
                  <h3>Повторите новый пароль</h3>
                  <Input
                    id={"passRePass"}
                    label={""}
                    error={inputErrors.rePassError}
                    isEmpty={!passObject.rePass}
                    value={passObject.rePass}
                    onChange={handlePassRePasswordChange}
                    password
                  />
                </div>
              </div>
              <button
                styleName="submitUserDataButton"
                onClick={() => {
                  handleSaveProfilePassword();
                }}
              >
                Сменить пароль
              </button>
            </div>
            <div className="edButDiv" styleName="edButDiv">
              <button
                onClick={() => {
                  handleEditingButton();
                }}
              >
                <img
                  src="../../../static/images/edit.svg"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          </div>
        )}
        {user_params.data.hasOwnProperty("BOFI") &&
        !profileSettings.isEditing ? (
          <div className="radarDiagram" styleName="radarDiagram">
            {!user_params.isLoading ? (
              <Radar data={constructRadarData()} redraw={true} />
            ) : (
              <div styleName="loader">
                <ReactLoading type="spin" color="#908373" />
              </div>
            )}
            <Link to="/params">
              <button>Переопределить параметры</button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        {user_params.data.hasOwnProperty("BOFI") &&
        !profileSettings.isEditing ? (
          <div className="statsDiagram" styleName="statsDiagram">
            {!user_params.isLoading ? (
              <div>
                <Select
                  id={"stats_choice"}
                  value={Object.keys(user_params.data)[statValue]}
                  values={Object.keys(user_params.data)}
                  onChange={handleStatChange}
                />
                <Line data={statsData} redraw={true} />
              </div>
            ) : (
              <div styleName="loader">
                <ReactLoading type="spin" color="#908373" />
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default connect(
  mapStateToProps("Profile"),
  mapDispatchToProps("Profile")
)(CSSModules(Profile, styles, { allowMultiple: true }));

// (Profile);
