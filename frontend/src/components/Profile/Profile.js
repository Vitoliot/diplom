// СТИЛИ ИГНОРИРОВАТЬ, ЗАНЯТЬСЯ РАЗМЕТКОЙ и РАБОТОЙ ЗАПРОСОВ И ГРАФИКОВ
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
import {
  Radar,
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import Header from "../Header/Header";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

const Profile = ({
  fetchUserData,
  fecthUserParameters,
  fetchUserAnswers,
  updateUserData,
  updateUserPassword,
  deleteUser,
  logoutUser,
  user_for_profile,
  user_params,
  user_answers,
}) => {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  useEffect(() => {});

  const [state, setState] = useState({
    statParam: [],
    isEditing: false,
    isBringable: false,
    pass: {
      oldPass: "",
      pass: "",
      rePass: "",
    },
    passIsLoading: false,
  });

  function handleOldPassPasswordChange(e) {
    setState(
      Object.assign({}, state, {
        pass: Object.assign({}, state.pass, {
          oldPass: e.target.value,
        }),
      })
    );
  }

  function handlePassPasswordChange(e) {
    setState(
      Object.assign({}, state, {
        pass: Object.assign({}, state.pass, { pass: e.target.value }),
      })
    );
  }

  function handlePassRePasswordChange(e) {
    setState(
      Object.assign({}, state, {
        pass: Object.assign({}, state.pass, { rePass: e.target.value }),
      })
    );
  }

  function validate(action, value) {
    switch (action) {
      case "profileData": {
        if (!value) {
          onError("Cannot save empty nickname!");
          return false;
        }
        if (nickname === value) {
          onError("Cannot save the same nickname!");
          return false;
        }
        if (value.length >= 32) {
          onError("Cannot save such a long nickname, need < 32 symbols!");
          return false;
        }
        return true;
      }

      case "profilePassword": {
        if (!state.pass.oldPass || !state.pass.pass || !state.pass.rePass) {
          onError("Cannot use empty passwords!");
          return false;
        }
        if (state.pass.pass === state.pass.oldPass) {
          onError("New password should not be the same!");
          return false;
        }
        if (state.pass.pass !== state.pass.rePass) {
          onError("New passwords are not equal!");
          return false;
        }
        if (
          state.pass.pass.length >= 64 ||
          state.pass.rePass.length >= 64 ||
          state.pass.oldPass.length >= 64
        ) {
          onError("Cannot use such a long password, need < 64 symbols!");
          return false;
        }
        return true;
      }
    }
  }

  function handleSaveProfileData() {
    if (validate("profileData", state.data.nick)) {
      onSaveProfileData(state.data.nick);
    }
  }

  function handleSaveProfilePassword() {
    if (validate("profilePassword")) {
      onSaveProfilePassword(
        state.pass.oldPass,
        state.pass.pass,
        state.pass.rePass
      );
      setState(
        Object.assign({}, state, {
          pass: Object.assign({}, state.pass, {
            oldPass: "",
            pass: "",
            rePass: "",
          }),
        })
      );
    }
  }

  const radarOptions = {};

  const radarData = {
    labels: [],
    datasets: [{}],
  };

  const statsOptions = {};

  const statsData = {};

  return (
    <div>
      {isEditing ? (
        <div className="userDataContainer">
          <div>
            <img></img>
            <h3>{user_for_profile.username}</h3>
          </div>
          <div>
            {user_for_profile.first_name && (
              <div>
                <h3> Имя </h3> <span> {user_for_profile.first_name}</span>
              </div>
            )}
            {user_for_profile.first_name && (
              <div>
                <h3> Фамилия </h3> <span> {user_for_profile.last_name}</span>
              </div>
            )}
            <div>
              <h3> Email </h3> <span> {user_for_profile.email}</span>
            </div>
            )
            <div>
              <h3> Заданий в день </h3>
              <span> {user_for_profile.task_in_day}</span>
            </div>
            )
          </div>
          <div>
            <button> Уведомления вкл выкл</button>
            <button> Редактировать данные вкл выкл</button>
            <button> Выйти </button>
          </div>
        </div>
      ) : (
        <div className="userEditDataContainer">
          <div>
            <div>
              <img></img>
              <input
                type="file"
                name="icon"
                accept="image/*"
                id="id_icon"
              ></input>
            </div>
            <div>
              <h3> Имя</h3>
              <Input></Input>
            </div>
            <div>
              <h3> Фамилия </h3> <Input></Input>
            </div>
            <div>
              <h3> Email </h3> <Input></Input>
            </div>
            <div>
              <h3> Заданий в день </h3>
              <select></select>
            </div>
            <button> Подтвердить изменения</button>
          </div>
          <div>
            <h2> Сменить пароль</h2>
            <Input
              id={"oldPassPass"}
              label={"Old password"}
              isEmpty={!state.pass.oldPass}
              value={state.pass.oldPass}
              onChange={handleOldPassPasswordChange}
              password
            />
            <Input
              id={"passPass"}
              label={"New password"}
              isEmpty={!state.pass.pass}
              value={state.pass.pass}
              onChange={handlePassPasswordChange}
              password
            />
            <Input
              id={"passRePass"}
              label={"Repeat password"}
              isEmpty={!state.pass.rePass}
              value={state.pass.rePass}
              onChange={handlePassRePasswordChange}
              password
            />
            <button
              text={"Change password"}
              onClick={handleSaveProfilePassword}
              className={styles.profileButton}
            />
          </div>
        </div>
      )}
      <div className="radarDiagram">
        <Radar options={radarOptions} data={radarData} />
        <Link to="/params"></Link>
      </div>
      <div className="stats">
        <select></select>
        <div>
          <Chart options={statsOptions} data={statsData} />
        </div>
      </div>
      <div className="lastAnswers">{/* второстепенно */}</div>
    </div>
  );
};

// Страница состоит из четырёх блоков личные данные, ромбовая диаграммы, графики изменения показателей и последние выполненные задания
// Содержимое блока личных данных - ник, фотка, ФИО (при наличии), почта
// Пользовательские сценарии - просмотр, редактирование личных данных и пароля, удаление акка
// Необходимые запросы - запрос на данные пользователя, запросы на изменение данных пользователя и запрос на изменение пароля, запрос на удаленние акка
// Проч. форма редактирования и форма просмотра - одна форма с одинаковыми инупатми - ввести булево значение на режим и кнопку на изменение
// Валидацияяяяяяяяя нужна

// Содержимое блока ромбовой диаграммы - диаграмма по основным показателям, кнопка на переопределение показателей
// Пользователский сценарий - просмотр
// Необходимые запросы - запрос на данные показателей

// Содержимое блока графиков - графики по изменению основных показателей
// Пользователский сценарий - просмотр, выбор показателя для просмотра
// Необходимые запросы - запрос на данные показателей

// Содержимое блока последних выполненных заданий - задание, курс, время, правильность, дата
// Пользовательский сценариий - просмотр, переход на страницу курса
// Необходимые запросы - пагинированный запрос на ответы пользователя, отсортированный по убыванию даты выполнения

// Кнопка логаута

export default connect(
  mapStateToProps("Profile"),
  mapDispatchToProps("Profile")
)(CSSModules(styles, Profile, { allowMultiple: true }));
