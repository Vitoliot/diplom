import actionCreators from "./actionCreators";
import axios from "axios";
import actions from "./actions";

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
        dispatch(
          actionCreators.addError(error.response.data.detail, null, dispatch)
        );
      }
    );
  };
}
// доделать после бэка
export function getTasksForTaskChoice(
  type,
  theme,
  method,
  have_test,
  test_prop,
  target,
  rsp,
  token,
  target_audience,
  adaptivity,
  control,
  individual,
  toQER,
  toBOFI,
  toAA,
  toVM,
  toVMWP,
  toLM,
  fast_to_do,
  effectivity,
  chalenge,
  compressed,
  gaming,
  fast_to_complete,
  isOnSite
) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_tasks_for_task_choice_started());
    let url = `education/taskforchoice/all?type=${type}&theme=${theme}&method=${method}&have_test=${have_test}&test_prop=${test_prop}&target=${target}&rsp=${rsp}&token=${token}&target_audience=${target_audience}&adaptivity=${adaptivity}&control=${control}&individual=${individual}&toQER=${toQER}&toBOFI=${toBOFI}&toAA=${toAA}&toVM=${toVM}&toVMWP=${toVMWP}&toLM=${toLM}&fast_to_do=${fast_to_do}&effectivity=${effectivity}&chalenge=${chalenge}&compressed=${compressed}&gaming=${gaming}&fast_to_complete=${fast_to_complete}&isOnSite=${isOnSite}`;
    return await axios.get(url).then(
      (response) => {
        dispatch(
          actionCreators.select_tasks_for_task_choice_successed(response.data)
        );
      },
      (error) => {
        dispatch(actionCreators.select_tasks_for_task_choice_failed());
        dispatch(
          actionCreators.addError(error.response.data.detail, null, dispatch)
        );
      }
    );
  };
}

export function getParamsForTaskChoice() {
  return async function (dispatch, getState, extraArgument) {
    let paramData = {};
    dispatch(actionCreators.select_params_for_task_choice_started());
    try {
      let type = (await getTypeParams()).data;
      let theme = (await getThemeParams()).data;
      let method = (await getMethodParams()).data;
      let target = (await getTargetParams()).data;
      let targetAudience = (await getTargetAudienceParams()).data;
      let doHaveTest = (await getDoHaveTestParams()).data;
      let testProp = (await getTestPropParams()).data;
      let rsp = (await getRspParams()).data;
      let token = (await getTokenParams()).data;
      Object.assign(paramData, paramData, type);
      Object.assign(paramData, paramData, theme);
      Object.assign(paramData, paramData, method);
      Object.assign(paramData, paramData, target);
      Object.assign(paramData, paramData, targetAudience);
      Object.assign(paramData, paramData, doHaveTest);
      Object.assign(paramData, paramData, testProp);
      Object.assign(paramData, paramData, rsp);
      Object.assign(paramData, paramData, token);
      dispatch(
        actionCreators.select_params_for_task_choice_successed(paramData)
      );
    } catch (err) {
      dispatch(actionCreators.select_params_for_task_choice_failed());
      dispatch(actionCreators.addError("ошибка", null, dispatch));
    }
  };
}

async function getTypeParams() {
  let url = "education/taskforchoice/props/type/1";
  return await axios.get(url).catch((error) => null);
}
async function getThemeParams() {
  let url = "education/taskforchoice/props/theme/1";
  return await axios.get(url).catch((error) => null);
}
async function getMethodParams() {
  let url = "education/taskforchoice/props/method/1";
  return await axios.get(url).catch((error) => null);
}
async function getDoHaveTestParams() {
  let url = "education/taskforchoice/props/dohavetest/1";
  return await axios.get(url).catch((error) => null);
}
async function getTestPropParams() {
  let url = "education/taskforchoice/props/testprop/1";
  return await axios.get(url).catch((error) => null);
}
async function getTargetParams() {
  let url = "education/taskforchoice/props/target/1";
  return await axios.get(url).catch((error) => null);
}
async function getRspParams() {
  let url = "education/taskforchoice/props/rsp/1";
  return await axios.get(url).catch((error) => null);
}

async function getTokenParams() {
  let url = "education/taskforchoice/props/token/1";
  return await axios.get(url).catch((error) => null);
}

async function getTargetAudienceParams() {
  let url = "education/taskforchoice/props/targetaudience/1";
  return await axios.get(url).catch((error) => null);
}
// function getTypeParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/type/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getThemeParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/theme/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getMethodParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/method/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getDoHaveTestParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/dohavetest/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getTestPropParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/testprop/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getTargetParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/target/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getRspParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/rsp/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }
// function getTokenParams() {
//   return async function (dispatch, getState, extraArgument) {
//     let url = "education/taskforchoice/props/token/1";
//     return await axios.get(url).then(
//       (response) => {},
//       (error) => {
//         dispatch(actionCreators.select_params_for_task_choice_failed());
//         dispatch(
//           actionCreators.addError(error.response.data.detail, null, dispatch)
//         );
//       }
//     );
//   };
// }

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
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}

export function addCourseToUser(course) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "activities/usercourses/new";
    return await axios.post(url, { user: user, course: course }).then(
      (response) => {
        dispatch(actionCreators.addSuccess("Вы успешно записаны на курс"));
        dispatch(actionCreators.create_usercourses_request_successed(course));
        dispatch(fetchCourseData(course, true));
      },
      (error) => {
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}

export function fetchUserCourses() {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_user_courses_request_started());
    let user = getState().user_for_profile.data.id;
    let url = `activities/${user}/courses`;
    return await axios.get(url).then(
      (response) =>
        dispatch(
          actionCreators.select_user_courses_request_successed(response.data)
        ),
      (error) => {
        dispatch(actionCreators.select_user_courses_request_failed());
        dispatch(
          actionCreators.addError(
            error.response.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}

export function fetchCourseData(course, isLogged) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_course_with_module_request_started());
    let url = "";
    if (isLogged) {
      let user = getState().user_for_profile.data.id;
      url += `activities/${user}/${course}`;
    } else {
      url += `education/course/${course}`;
    }
    return await axios.get(url).then(
      (response) => {
        if (isLogged) {
          dispatch(
            actionCreators.select_course_with_module_request_successed(
              response.data
            )
          );
        } else {
          dispatch(
            actionCreators.select_course_with_module_request_successed_to_unathorized(
              { course: response.data }
            )
          );
        }
      },
      (error) => {
        if (error.response.status == "404") {
          dispatch(fetchCourseData(course, false));
        } else {
          dispatch(actionCreators.select_course_with_module_request_failed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      }
    );
  };
}

export function onSignIn(data) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.auth_request_started());
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
            actionCreators.auth_request_successed(response.data.refresh)
          );
          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.access}`,
          };
          dispatch(onFetchUserData());
        },
        (error) => {
          dispatch(actionCreators.auth_request_failed());
          dispatch(
            actionCreators.addError(error.response.data.detail, null, dispatch)
          );
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
          dispatch(
            actions.add_success("Вам на почту отправлено письмо для активации")
          );
        },
        (error) => {
          dispatch(actionCreators.sign_up_request_failed());
          dispatch(
            actionCreators.addError(error.response.data.detail, null, dispatch)
          );
        }
      );
  };
}

export function tokenUpdate() {
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
        dispatch(
          actionCreators.addError(error.response.data.detail, null, dispatch)
        );
      }
    );
  };
  // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}

export function onFetchUserData() {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/users/me";
    dispatch(actionCreators.select_user_data_started());
    return await axios.get(url).then(
      (response) => {
        dispatch(actionCreators.select_user_data_successed(response.data));
        dispatch(fetchTodayCompleteTasks());
      },
      (error) => {
        dispatch(actionCreators.select_user_data_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}

export function onFetchUserParameters() {
  return async function (dispatch, getState, extraArgument) {
    let url = `user/profile_params/${getState().user_for_profile.data.id}`;
    dispatch(actionCreators.select_user_params_started());
    return await axios.get(url).then(
      (response) => {
        console.log("userparams", response.data);
        dispatch(actionCreators.select_user_params_successed(response.data));
      },
      (error) => {
        dispatch(actionCreators.select_user_params_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onFetchUserAnswers() {
  return async function (dispatch, getState, extraArgument) {
    let url = "";
    return await axios.get(url).then(
      (response) => {
        dispatch(actionCreators.addSuccess());
      },
      (error) => {
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onUpdateUserData(data) {
  return async function (dispatch, getState, extraArgument) {
    let url = `user/profile/update/${getState().user_for_profile.data.id}`;
    dispatch(actionCreators.update_profile_data_request_started());
    return await axios.put(url, data).then(
      (response) => {
        dispatch(actionCreators.update_profile_data_request_succesed());
        dispatch(actionCreators.addSuccess("Личные данные успешно обновлены"));
      },
      (error) => {
        dispatch(actionCreators.update_profile_data_request_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onUpdateUserIcon(data) {
  const uploadData = new FormData();
  uploadData.append("icon", data.icon, data.icon.name);
  console.log(uploadData);
  return async function (dispatch, getState, extraArgument) {
    let url = `user/profile/update/icon/${getState().user_for_profile.data.id}`;
    dispatch(actionCreators.update_profile_icon_request_started());
    return await axios
      .patch(url, uploadData, {
        headers: { "Content-Type": "multipart/form-data", Vary: "Accept" },
      })
      .then(
        (response) => {
          dispatch(
            actionCreators.update_profile_icon_request_succesed(response.data)
          );
          dispatch(actionCreators.addSuccess("Аватар успешно обновлён"));
        },
        (error) => {
          dispatch(actionCreators.update_profile_icon_request_failed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}
export function onUpdateUserPassword(oldPass, pass) {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/users/set_password/";
    dispatch(actionCreators.update_profile_password_request_started());
    return await axios
      .post(url, { current_password: oldPass, new_password: pass })
      .then(
        (response) => {
          dispatch(actionCreators.update_profile_password_request_successed());
          dispatch(actionCreators.addSuccess("Пароль успешно обновлён"));
        },
        (error) => {
          dispatch(actionCreators.update_profile_password_request_successed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}
export function onDeleteUser(pass) {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/users/me";
    dispatch(actionCreators.delete_profile_request_started());
    return await axios.delete(url, { current_password: pass }).then(
      (response) => {
        dispatch(actionCreators.delete_profile_request_successed());
      },
      (error) => {
        dispatch(actionCreators.delete_profile_request_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onLogoutUser() {
  return async function (dispatch, getState, extraArgument) {
    let url = "auth/jwt/logout";
    dispatch(actionCreators.logout_request_started());
    return await axios
      .post(url, { refresh_token: getState().refreshToken })
      .then(
        (response) => {
          dispatch(actionCreators.logout_request_successed());
          dispatch(actionCreators.addSuccess("Вы успешно вышли"));
        },
        (error) => {
          dispatch(actionCreators.logout_request_failed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}
export function fetchTodayCompleteTasks() {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    let url = `activities/userdaily/${user}/${date}`;
    dispatch(actionCreators.select_today_complete_tasks_started());
    return await axios.get(url).then(
      (response) => {
        dispatch(
          actionCreators.select_today_complete_tasks_successed(response.data)
        );
      },
      (error) => {
        dispatch(actionCreators.select_today_complete_tasks_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
        dispatch(createTodayCompleteTasks());
      }
    );
  };
}

export function createTodayCompleteTasks() {
  return async function (dispatch, getState, extraArgument) {
    let url = "activities/userdaily/new";
    let user = getState().user_for_profile.data.id;
    dispatch(actionCreators.create_today_complete_tasks_started());
    return await axios.post(url, { user: user, amount_of_tasks: 0 }).then(
      (response) => {
        console.log(response);
        console.log(response.data);
        dispatch(
          actionCreators.select_today_complete_tasks_successed(response.data)
        );
      },
      (error) => {
        dispatch(actionCreators.create_today_complete_tasks_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function updateTodayCompleteTasks(amount_of_tasks) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let date = new Date();
    date =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    let url = `activities/userdaily/${user}/${date}`;
    dispatch(actionCreators.update_today_complete_tasks_started());

    return await axios.put(url, { amount_of_tasks: amount_of_tasks }).then(
      (response) => {
        dispatch(actionCreators.update_today_complete_tasks_successed());
      },
      (error) => {
        dispatch(actionCreators.update_today_complete_tasks_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}

export function changeCurrentTask(task) {
  return async function (dispatch, getState, extraArgument) {
    // dispatch(actionCreators.task_frontend_update(task));
    dispatch(onGetTask(task.id));
  };
}

export function setCurrentCourse(course) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.course_frontend_update(course));
  };
}
export function deleteAnswer(answerId) {
  return async function (dispatch, getState, extraArgument) {
    let url = `deletanswer/${answerId}`;

    dispatch(actionCreators.delete_answer_request_started());
    return await axios.delete(url).then(
      (response) => {
        dispatch(actionCreators.delete_answer_request_successed());
        dispatch(actionCreators.addSuccess("Ответ успешно удалён"));
      },
      (error) => {
        dispatch(actionCreators.delete_answer_request_failed());
        dispatch(
          actionCreators.addError(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateUserTask(taskId, time, usercourse, correctness) {
  return async function (dispatch, getState, extraArgument) {
    let url = "activities/usertask/new";
    dispatch(actionCreators.create_usertask_request_started());
    return await axios
      .post(url, {
        task: taskId,
        time: time,
        usercourse: usercourse,
        correctness: correctness,
      })
      .then(
        (response) => {
          dispatch(
            actionCreators.create_usertask_request_successed(response.data)
          );
        },
        (error) => {
          dispatch(actionCreators.create_usertask_request_failed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}
export function onCreateAnswer(usertaskId, number, answer, item) {
  return async function (dispatch, getState, extraArgument) {
    let url = "activities/answer/new";
    dispatch(actionCreators.create_answer_request_started());
    return await axios
      .post(url, {
        usertask: usertaskId,
        number: number,
        answer: answer,
        item: item,
      })
      .then(
        (response) => {
          dispatch(actionCreators.create_answer_request_successed());
        },
        (error) => {
          dispatch(actionCreators.create_answer_request_failed());
          dispatch(
            actionCreators.addError(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}

export function onDoneTask(correctness) {
  return async function (dispatch, getState, extraArgument) {
    console.log(correctness);
    dispatch(actionCreators.task_is_complete_update(true, correctness));
  };
}

export function onCreateBOFI(value) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/BOFI/new";
    dispatch(actionCreators.newBOFIValue(value));
    return await axios.post(url, { user: user, value: value }).then(
      (response) => {},
      (error) => {
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateVM(value) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/VM/new";
    dispatch(actionCreators.newVMValue(value));
    return await axios.post(url, { user: user, value: value }).then(
      (response) => {},
      (error) => {
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateVMWP(value) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/VMWP/new";
    dispatch(actionCreators.newVMWPValue(value));
    return await axios.post(url, { user: user, value: value }).then(
      (response) => {},
      (error) => {
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateLM(value) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/LM/new";
    dispatch(actionCreators.newLMValue(value));
    return await axios.post(url, { user: user, value: value }).then(
      (response) => {},
      (error) => {
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateAA(value) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/AA/new";
    dispatch(actionCreators.newAAalue(value));
    return await axios.post(url, { user: user, value: value }).then(
      (response) => {},
      (error) => {
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onCreateQER(value, WPM, QU) {
  return async function (dispatch, getState, extraArgument) {
    let user = getState().user_for_profile.data.id;
    let url = "user/QER/new";
    dispatch(actionCreators.newQERValue(value, WPM, QU));
    return await axios
      .post(url, { user: user, value: value, WPM: WPM, QU: QU })
      .then(
        (response) => {},
        (error) => {
          dispatch(
            actions.add_error(
              error.response.data.detail,
              error.response.status,
              dispatch
            )
          );
        }
      );
  };
}

export function onGetTask(taskId) {
  return async function (dispatch, getState, extraArgument) {
    dispatch(actionCreators.select_task_request_started());
    let url = `education/task/${taskId}`;
    return await axios.get(url).then(
      (response) => {
        dispatch(actionCreators.select_task_request_successed(response.data));
      },
      (error) => {
        dispatch(actionCreators.select_task_request_failed());
        dispatch(
          actions.add_error(
            error.response.data.detail,
            error.response.status,
            dispatch
          )
        );
      }
    );
  };
}
export function onChangeExerciseState(param) {
  return async function (dispatch, getState, extraArgument) {
    console.log(param);
    if (param == "КЭЧ") dispatch(onGetTask(4));
    if (param == "ЛП") dispatch(onGetTask(5));
    dispatch(actionCreators.changeExerciseState(true, param));
  };
}
