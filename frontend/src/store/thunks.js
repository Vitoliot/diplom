import actionCreators from "./actionCreators";
import axios from "axios";
// axios.defaults.headers.common = {'Content-Type ': 'application/json'}

export function fetchTasks() {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_tasks_request_started());
    let theme = getState().task_choicePage.is_theme;
    let url = "education/task/all/type";
    if (theme) {
      url = "education/task/all/theme";
    }
    return await axios.get(url).then(
      (response) =>
        dispatch(actionCreators.select_tasks_request_successed(response.data)),
      (error) => {
        dispatch(actionCreators.select_tasks_request_failed());
        dispatch(actionCreators.addError(error));
      }
    );
  };
}

export function fetchCourses() {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_courses_request_started());
    let params = getState().course_sort;
    let url = "education/course/all?ordering=";
    Object.keys(params).forEach((element) => {
      if (element === "date" && params[element]) {
        if (!params["rule"]) url += "date_create,";
        else url += "-date_create,";
      }
      if (element === "alphabet" && params[element]) {
        if (!params["rule"]) url += "title,";
        else url += "-title,";
      }
    });
    return await axios.get(url).then(
      (response) => {
        dispatch(actionCreators.apply_course_choicePage_sort_isChange_off());
        dispatch(
          actionCreators.select_courses_request_successed(response.data)
        );
      },
      (error) => {
        dispatch(actionCreators.select_courses_request_failed());
        dispatch(actionCreators.addError(error));
      }
    );
  };
}

export function addCourseToUser(course) {
  return async function (dispatch, getState, extraArgument) {
    dispatch();
    let user = getState().user.id;
    let url = "activities/usercourses/new";
    return await axios.post(url, { user: user, course: course }).then(
      (response) => {
        dispatch(actionCreators.addSuccess("Вы успешно записаны на курс"));
        dispatch(actionCreators.select_user_courses_request_successed(course));
      },
      (error) => {
        dispatch(actionCreators.addError(error.response.data.detail));
        if (error.response.status === "401") tokenUpdate();
      }
    );
  };
}

export function fetchUserCourses() {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_user_courses_request_started());
    let user = getState().user.id;
    let url = `activities/${user}/courses`;
    return await axios.get(url).then(
      (response) =>
        dispatch(
          actionCreators.select_user_courses_request_successed(response.data)
        ),
      (error) => {
        dispatch(actionCreators.select_user_courses_request_failed());
        dispatch(actionCreators.addError(error.response.detail));
        if (error.response.status === "401") tokenUpdate();
      }
    );
  };
}

export function fetchCourseData(course, isLogged) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_course_with_module_request_started());
    let url = "";
    if (isLogged) {
      user = getState().user.id;
      url += `activities/${user}/${course}`;
    } else {
      url += `education/course/${course}`;
    }
    return await axios.get(url).then(
      (response) =>
        dispatch(
          actionCreators.select_course_with_module_request_successed(
            response.data
          )
        ),
      (error) => {
        dispatch(actionCreators.select_course_with_module_request_failed());
        dispatch(actionCreators.addError(error));
      }
    );
  };
}

export function onSignIn(data) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.auth_request_started());
    console.log(data);
    let url = "auth/jwt/create";
    return await axios
      .post(
        url,
        { username: data.username, password: data.pass },
        { "Content-Type": "application/json", Vary: "Accept" }
      )
      .then(
        (response) => {
          dispatch(
            actionCreators.auth_request_successed(
              response.data.refresh
            )
          );
          dispatch(afterSignIn(response.data.access));
        },
        (error) => {
          dispatch(actionCreators.auth_request_failed());
          dispatch(actionCreators.addError(error.response.data.detail));
        }
      );
  };
}

export function onSignUp(data) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.sign_up_request_started());
    let url = "auth/users";
    return await axios
      .post(
        url,
        {
          username: data.username,
          email: data.email,
          password: data.pass,
        },
        { "Content-Type": "application/json", Vary: "Accept" }
      )
      .then(
        (response) => {
          dispatch(actionCreators.sign_up_request_successed(response.data));
        },
        (error) => {
          dispatch(actionCreators.sign_up_request_failed());
          dispatch(actionCreators.addError(error));
        }
      );
  };
}

export function afterSignIn(token) {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/users/me";
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log("dasdas");
    return await axios.get(url).then(
      (response) => {
        dispatch(actionCreators.select_user_data_successed(response.data));
        console.log(getState())
      },
      (error) => {
        dispatch(actionCreators.addError(error.response.data.detail));
      }
    );
  };
}

function tokenUpdate() {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/jwt/refresh";
    let refreshToken = getState().refreshToken;
    return await axios.post(url, { refresh: refreshToken }).then(
      (response) => {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${response.data.access}`,
        };
      },
      (error) => {
        dispatch(actionCreators.addError(error.response.data));
      }
    );
  };
  // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}
