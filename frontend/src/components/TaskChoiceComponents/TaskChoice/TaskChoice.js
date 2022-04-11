import React from "react";
import { useState, useCallback, useRef, useReducer } from "react";
import Header from "../../Header/Header.js";
import DLCButton from "../DLCButton/DLCButton";
import CenterButton from "../CenterButton/CenterButton";
import ThreeStateButton from "../ThreeStateButton/ThreeStateButton";
import ToggleButtons from "../ToggleButtons/ToggleButtons";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import TaskChoiceCard from "../TaskChoiceCard/TaskChoiceCard";
import Select from "../../Select/Select";
import styles from "./TaskChoice.css";
import CSSModules from "react-css-modules";
import { connect } from "react-redux";
import mapStateToProps from "../../../store/mapStateToProps.js";
import mapDispatchToProps from "../../../store/mapDispatchToProps.js";

const TaskChoice = ({
  taskChoicePage,
  onChangeCurrentTask,
  onGetTasksForTaskChoice,
  onGetParamsForTaskChoice,
}) => {
  const [studentOrTeacher, setStudentOrTeacher] = useState(false);
  const [isSeeTasks, setIsSeeTasks] = useState(false);
  const [isSeeFilters, setIsSeeFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let maxPage = 1;
  let [taskParts, setTaskParts] = useState([]);
  const [adaptivity, setAdaptivity] = useState(0);
  const [control, setControl] = useState(0);
  const [individual, setIndividual] = useState(0);
  const [type, settype] = useState(0);
  const [theme, settheme] = useState(0);
  const [method, setmethod] = useState(0);
  const [target, settarget] = useState(0);
  const [targetAudience, settargetAudience] = useState(0);
  const [doHaveTest, setdoHaveTest] = useState(0);
  const [testProp, settestProp] = useState(0);
  const [rsp, setrsp] = useState(0);
  const [token, settoken] = useState(0);
  const [toQER, setToQER] = useState("");
  const [toBOFI, setToBOFI] = useState("");
  const [toAA, setToAA] = useState("");
  const [toVM, setToVM] = useState("");
  const [toVMWP, setToVMWP] = useState("");
  const [toLM, setToLM] = useState("");
  const [fast_to_do, setFast_to_do] = useState(false);
  const [fast_to_complete, setFast_to_complete] = useState(false);
  const [effectivity, setEffectivity] = useState(false);
  const [effectivityForTeacher, setEffectivityForTeacher] = useState(false);
  const [motivation, setMotivation] = useState(false);
  const [chalenge, setChalenge] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [gaming, setGaming] = useState(false);

  let [toggleButtonTypeThemeState, setToggleButtonTypeThemeState] = useState([
    { title: "Тема", isPressed: true },
    { title: "Тип", isPressed: false },
  ]);
  let [themeChoiceState, setThemeChoiceState] = useState([]);
  let [typeChoiceState, setTypeChoiceState] = useState([]);
  let [toggleButtonOnSiteState, setToggleButtonOnSiteState] = useState([
    { title: "Все", isPressed: true },
    { title: "Есть на сайте", isPressed: false },
    { title: "Нет на сайте", isPressed: false },
  ]);

  if (
    (!taskChoicePage.isFetched && !taskChoicePage.isLoading) ||
    taskChoicePage.isChanged
  ) {
    onGetParamsForTaskChoice();
  }

  if (taskChoicePage.tasks.length > 0) {
    //  пагинация
    divideTasksToPage(taskChoicePage.tasks);
  }

  function divideTasksToPage(tasks) {
    let divVal = 5;
    taskParts=[];
    if (tasks.length > divVal) {
      let iMax =
        tasks.length % divVal === 0
          ? (tasks.length - (tasks.length % divVal)) / divVal
          : (tasks.length - (tasks.length % divVal)) / divVal + 1;
      maxPage = iMax != 0 ? iMax : 1;
      for (let i = 0; i < iMax; i++) {
        taskParts.push(
          tasks.slice(
            i * divVal,
            (i + 1) * divVal > tasks.length ? tasks.length : (i + 1) * divVal
          )
        );
      }
    } else {
      taskParts.push(tasks);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  //   хэндлеры
  function handleToggleButtonOnSiteState(indexT) {
    let valueT = toggleButtonOnSiteState[indexT];
    if (!valueT.isPressed) {
      valueT.isPressed = true;
      toggleButtonOnSiteState.forEach((value, index) => {
        if (index != indexT) {
          value.isPressed = false;
        }
      });
    }
    setToggleButtonOnSiteState(toggleButtonOnSiteState.slice());
  }

  function handleToggleButtonTypeThemeState(indexT) {
    let valueT = toggleButtonTypeThemeState[indexT];
    if (!valueT.isPressed) {
      valueT.isPressed = true;
      toggleButtonTypeThemeState.forEach((value, index) => {
        if (index != indexT) {
          value.isPressed = false;
        }
      });
    }
    setToggleButtonTypeThemeState(toggleButtonTypeThemeState.slice());
  }

  //   фокусы

  if (taskChoicePage.isFetched && !themeChoiceState && !typeChoiceState) {
    constructThemeChoiceState();
    constructTypeChoiceState();
  }

  function constructThemeChoiceState() {
    let themeState = [];
    for (let i = 0; i < taskChoicePage.params.theme_choices.length; i++) {
      themeState.push(false);
    }

    setThemeChoiceState(themeState);
  }
  function constructTypeChoiceState() {
    let typeState = [];
    for (let i = 0; i < taskChoicePage.params.type_choices.length; i++) {
      typeState.push(false);
    }
    setTypeChoiceState(typeState);
  }

  function constructTaskFilters() {
    let trs = ["", "true", "false"];
    let isOnSite = toggleButtonOnSiteState.findIndex((val) => {
      return val.isPressed;
    });

    let type_t = typeChoiceState.findIndex((val) => {
      return val;
    });
    let theme_t = themeChoiceState.findIndex((val) => {
      return val;
    });
    return [
      type_t != -1 ? type_t : "",
      theme_t != -1 ? theme_t : "",
      method ? method : "",
      doHaveTest ? doHaveTest : "",
      testProp ? testProp : "",
      target ? target : "",
      rsp ? rsp : "",
      token ? token : "",
      targetAudience ? targetAudience : "",
      trs[adaptivity],
      trs[control],
      trs[individual],
      toQER,
      toBOFI,
      toAA,
      toVM,
      toVMWP,
      toLM,
      fast_to_do ? fast_to_do : "",
      effectivity ? effectivity : "",
      chalenge ? chalenge : "",
      compressed ? compressed : "",
      gaming ? gaming : "",
      fast_to_complete ? fast_to_complete : "",
      trs[isOnSite],
    ];
  }

  return (
    <div>
      <Header title={"Подбор упражнения"} />
      <div style={{ display: "flex", margin: "1em", padding: "1em" }}>
        <div
          style={{
            "max-width": "60%",
            margin: "auto",
            display: "flex",
            padding: "1em",
            "flex-direction": "column",
            gap: "1em",
            "background-color": "#ebe2ca",
            "border-radius": "20px",
          }}
        >
          <div styleName="toggleButtonsContainer">
            <ToggleButtons
              togglePressedState={toggleButtonOnSiteState}
              handle={handleToggleButtonOnSiteState}
            />
            <ToggleButtons
              togglePressedState={toggleButtonTypeThemeState}
              handle={handleToggleButtonTypeThemeState}
            />
          </div>
          <div styleName="centreButtonsContainer">
            {toggleButtonTypeThemeState[0].isPressed ? (
              taskChoicePage.isFetched ? (
                <div>
                  {taskChoicePage.params.theme_choices.map(
                    (themeChoice, index) => {
                      return (
                        <CenterButton
                          title={themeChoice[1]}
                          isPressed={themeChoiceState[index]}
                          handle={() => {
                            themeChoiceState[index] = !themeChoiceState[index];
                            setThemeChoiceState(themeChoiceState.slice());
                          }}
                          focus={() => {}}
                        />
                      );
                    }
                  )}
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <h1
                    style={{
                      margin: "auto",
                      color: "#908373",
                      "font-family": "UbuntuBold",
                    }}
                  >
                    Загрузка...
                  </h1>
                </div>
              )
            ) : taskChoicePage.isFetched ? (
              <div>
                {taskChoicePage.params.type_choices.map((typeChoice, index) => {
                  return (
                    <CenterButton
                      title={typeChoice[1]}
                      isPressed={typeChoiceState[index]}
                      handle={() => {
                        typeChoiceState[index] = !typeChoiceState[index];
                        setTypeChoiceState(typeChoiceState.slice());
                      }}
                      focus={() => {}}
                    />
                  );
                })}
              </div>
            ) : (
              <h1
                style={{
                  margin: "auto",
                  color: "#908373",
                  "font-family": "UbuntuBold",
                }}
              >
                Загрузка...
              </h1>
            )}
          </div>
          <div styleName="dlcButtonsContainer">
            <div
              style={{
                display: "flex",
              }}
            >
              <ToggleSwitch
                isPressed={studentOrTeacher}
                handle={setStudentOrTeacher}
              />
            </div>
            {studentOrTeacher ? (
              <div
                style={{
                  display: "flex",
                  "justify-content": "space-evenly",
                  width: "100%",
                }}
              >
                <DLCButton
                  title={"Быстрые"}
                  overview={"не отнимут много времени"}
                  isPressed={fast_to_complete}
                  handle={setFast_to_complete}
                  focus={null}
                />
                <DLCButton
                  title={"Эффективные"}
                  overview={"взрывной старт для начинающих"}
                  isPressed={effectivity}
                  handle={setEffectivity}
                  focus={null}
                />
                <DLCButton
                  title={"Вызывающие"}
                  overview={"достигнуть успеха будет нелегко"}
                  isPressed={chalenge}
                  handle={setChalenge}
                  focus={null}
                />
                <DLCButton
                  title={"Сжатые"}
                  overview={"когда много букав это не ваше"}
                  isPressed={compressed}
                  handle={setCompressed}
                  focus={null}
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  "justify-content": "space-evenly",
                  width: "100%",
                }}
              >
                <DLCButton
                  title={"Быстрые"}
                  overview={"составляются почти мгновенно"}
                  isPressed={fast_to_do}
                  handle={setFast_to_do}
                  focus={null}
                />
                <DLCButton
                  title={"Эффективные"}
                  overview={"взрывной старт для начинающих"}
                  isPressed={effectivityForTeacher}
                  handle={setEffectivityForTeacher}
                  focus={null}
                />
                <DLCButton
                  title={"Мотивирующие"}
                  overview={"помогают не бросить развитие"}
                  isPressed={motivation}
                  handle={setMotivation}
                  focus={null}
                />
                <DLCButton
                  title={"Игровые"}
                  overview={"весёлые упражнения"}
                  isPressed={gaming}
                  handle={setGaming}
                  focus={null}
                />
              </div>
            )}
          </div>
          <div>
            <div style={{ display: "flex" }}>
              <button
                styleName="filterButton"
                onClick={() => {
                  setIsSeeFilters(!isSeeFilters);
                }}
              >
                {"Фильтры"}
              </button>
            </div>
            {isSeeFilters ? (
              <div styleName="filtersContainer">
                <div>
                  <Select
                    id="ad"
                    title="адаптивное"
                    value={adaptivity ? ["true", "false"][adaptivity - 1] : ""}
                    values={["true", "false"]}
                    onChange={setAdaptivity}
                  />
                  <Select
                    id="co"
                    title="контрольное"
                    value={control ? ["true", "false"][control - 1] : ""}
                    values={["true", "false"]}
                    onChange={setControl}
                  />
                  <Select
                    id="in"
                    title="индивиндуальное"
                    value={individual ? ["true", "false"][individual - 1] : ""}
                    values={["true", "false"]}
                    onChange={setIndividual}
                  />
                  <Select
                    id="me"
                    title="методы обучения"
                    value={
                      method
                        ? taskChoicePage.params.methods_of_learning_choices[
                            method - 1
                          ][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.methods_of_learning_choices.map(
                        (arr) => {
                          return [arr[1]];
                        }
                      ),
                    ]}
                    onChange={setmethod}
                  />
                  <Select
                    id="ta"
                    title="цель"
                    value={
                      target
                        ? taskChoicePage.params.target_choices[target - 1][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.target_choices.map((arr) => {
                        return [arr[1]];
                      }),
                    ]}
                    onChange={settarget}
                  />
                </div>
                <div>
                  <Select
                    id="taa"
                    title="целевая аудитория"
                    value={
                      targetAudience
                        ? taskChoicePage.params.target_audience_choices[
                            targetAudience - 1
                          ][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.target_audience_choices.map(
                        (arr) => {
                          return [arr[1]];
                        }
                      ),
                    ]}
                    onChange={settargetAudience}
                  />
                  <Select
                    id="dht"
                    title="с тестированием"
                    value={
                      doHaveTest
                        ? taskChoicePage.params.do_have_test_choices[
                            doHaveTest - 1
                          ][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.do_have_test_choices.map(
                        (arr) => {
                          return [arr[1]];
                        }
                      ),
                    ]}
                    onChange={setdoHaveTest}
                  />
                  <Select
                    id="tp"
                    title="тестирование"
                    value={
                      testProp
                        ? taskChoicePage.params.test_property_choices[
                            testProp - 1
                          ][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.test_property_choices.map(
                        (arr) => {
                          return [arr[1]];
                        }
                      ),
                    ]}
                    onChange={settestProp}
                  />
                  <Select
                    id="rsp"
                    title="ВРС"
                    value={
                      rsp ? taskChoicePage.params.rsp_choices[rsp - 1][1] : ""
                    }
                    values={[
                      ...taskChoicePage.params.rsp_choices.map((arr) => {
                        return [arr[1]];
                      }),
                    ]}
                    onChange={setrsp}
                  />
                  <Select
                    id="tok"
                    title="токен"
                    value={
                      token
                        ? taskChoicePage.params.token_choices[token - 1][1]
                        : ""
                    }
                    values={[
                      ...taskChoicePage.params.token_choices.map((arr) => {
                        return [arr[1]];
                      }),
                    ]}
                    onChange={settoken}
                  />
                </div>
                <div>
                  <ThreeStateButton
                    paramsPressState={[
                      { title: "КЭЧ", isPressed: toQER },
                      { title: "ШПЗ", isPressed: toBOFI },
                      { title: "ВПСП", isPressed: toVMWP },
                      { title: "ВП", isPressed: toVM },
                      { title: "ЛП", isPressed: toLM },
                      { title: "КВ", isPressed: toAA },
                    ]}
                    handlersParamButton={[
                      setToQER,
                      setToBOFI,
                      setToVMWP,
                      setToVM,
                      setToLM,
                      setToAA,
                    ]}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div styleName="finalButtonContainer">
            <button
              styleName="doneButton"
              onClick={() => {
                onGetTasksForTaskChoice(constructTaskFilters());
                setIsSeeTasks(true);
                divideTasksToPage(taskChoicePage.tasks);
              }}
            >
              {"Показать подобранные упражнения"}
            </button>
          </div>
          {!taskChoicePage.isLoading ? (
            isSeeTasks ? (
              <div styleName="tasksContainer">
                <div
                  style={{
                    display: "flex",
                    "flex-direction": "column",
                    gap: "1em",
                  }}
                >
                  {taskChoicePage.tasks.length > 0 ? (
                    taskParts[currentPage - 1].map((task, index) => {
                      return (
                        <TaskChoiceCard
                          task={task}
                          index={index}
                          onChangeCurrentTask={onChangeCurrentTask}
                        />
                      );
                    })
                  ) : (
                    <div style={{ display: "flex" }}>
                      <h1
                        style={{
                          margin: "auto",
                          color: "#908373",
                          "font-family": "UbuntuBold",
                        }}
                      >
                        Нет упражнений, удовлетворяющих заданным параметрам
                      </h1>
                    </div>
                  )}
                </div>
                <div styleName="pages">
                  <div
                    className="currentPageContainer"
                    styleName="currentPageContainer"
                  >
                    <h3>{currentPage + "/" + maxPage}</h3>
                  </div>
                  <div className="changeButton" styleName="changeButton">
                    <button onClick={handlePreviousPage}>
                      <img
                        src="../../../../static/images/dropright.svg"
                        width={24}
                        height={32}
                        color="#EBE2CA"
                      ></img>
                    </button>
                    <button onClick={handleNextPage}>
                      <img
                        src="../../../../static/images/dropleftc.svg"
                        width={24}
                        height={32}
                        color="#EBE2CA"
                      ></img>
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ) : (
            <div styleName="tasksContainer">
              <h1
                style={{
                  margin: "auto",
                  color: "#908373",
                  "font-family": "UbuntuBold",
                }}
              >
                Загрузка...
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps("TaskChoice"),
  mapDispatchToProps("TaskChoice")
)(CSSModules(TaskChoice, styles, { allowMultiple: false }));
