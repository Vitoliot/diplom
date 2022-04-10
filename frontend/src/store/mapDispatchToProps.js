import actionCreators from "./actionCreators";
import {
  addCourseToUser,
  fetchCourses,
  fetchTasks,
  fetchUserCourses,
  fetchCourseData,
  onSignIn,
  onSignUp,
  onFetchUserData,
  onFetchUserParameters,
  onFetchUserAnswers,
  onUpdateUserData,
  onUpdateUserPassword,
  onDeleteUser,
  onLogoutUser,
  fetchTodayCompleteTasks,
  deleteAnswer,
  changeCurrentTask,
  setCurrentCourse,
  onUpdateUserIcon,
  onCreateAnswer,
  onCreateUserTask,
  onDoneTask,
  onCreateAA,
  onCreateBOFI,
  onCreateVMWP,
  onCreateVM,
  onCreateLM,
  onCreateQER,
  onGetTask,
  onChangeExerciseState,
} from "./thunks";

function mapDispatchToProps(component) {
  switch (component) {
    case "TaskCard":
      return function (dispatch) {
        return {
          onChangeCurrentTask: (task) => {
            dispatch(changeCurrentTask(task));
          },
        };
      };
    case "TaskCatalog":
      return function (dispatch) {
        return {
          on_apply_task_choicePage_filters: () => {
            dispatch(actionCreators.apply_task_choicePage_filters());
          },
          on_init: () => {
            dispatch(fetchTasks());
          },
          on_apply_task_choicePage_task: (current_task_by_theme_and_id) => {
            dispatch(
              actionCreators.apply_task_choicePage_task(
                current_task_by_theme_and_id
              )
            );
          },
        };
      };
    case "Header":
      return function (dispatch) {
        return { dispatch };
      };
    case "AuthorizeRoute":
      return function (dispatch) {
        return { dispatch };
      };
    case "CourseCatalog":
      return (dispatch) => {
        return {
          apply_course_choicePage_sort: (course_sort) => {
            dispatch(actionCreators.apply_course_choicePage_sort(course_sort));
          },
          break_course_choicePage_sort: () => {
            dispatch(actionCreators.break_course_choicePage_sort());
          },
          on_init_authorize: () => {
            dispatch(fetchCourses());
            dispatch(fetchUserCourses());
          },
          on_init: () => {
            dispatch(fetchCourses());
          },
          on_update: () => {
            dispatch(fetchCourses());
          },
          on_course_add: (course) => {
            dispatch(addCourseToUser(course));
          },
        };
      };
    case "CourseCard":
      return (dispatch) => {
        return {
          on_course_add: (course) => {
            dispatch(addCourseToUser(course));
          },
          setCurrent_course: (course) => {
            dispatch(setCurrentCourse(course));
          },
        };
      };
    case "Course":
      return (dispatch) => {
        return {
          onCourseAdd: (course) => {
            dispatch(addCourseToUser(course));
          },
          onInit: (course, isLogged) => {
            dispatch(fetchCourseData(course, isLogged));
          },
          onFetchTodayCompleteTasks: () => {
            dispatch(fetchTodayCompleteTasks());
          },
          onChangeCurrentTask: (task) => {
            dispatch(changeCurrentTask(task));
          },
        };
      };
    case "CourseTaskDisplay":
      return (dispatch) => {
        return {
          onDeleteAnswer: (answerId) => {
            dispatch(deleteAnswer(answerId));
          },
          onChangeCurrentTask: (task) => {
            dispatch(changeCurrentTask(task));
          },
        };
      };
    case "Auth":
      return (dispatch) => {
        return {
          onSignIn: (data) => {
            dispatch(onSignIn(data));
          },
          onSignUp: (data) => {
            dispatch(onSignUp(data));
          },
          onError: (err) => {
            dispatch(actionCreators.addError(err));
          },
        };
      };
    case "EventsView":
      return (dispatch) => {
        return {
          onRemoveError: (id) => {
            dispatch(actionCreators.removeError(id));
          },
          onRemoveSuccess: (id) => {
            dispatch(actionCreators.removeSuccess(id));
          },
        };
      };
    case "Profile":
      return (dispatch) => {
        return {
          fetсhUserParameters: () => {
            dispatch(onFetchUserParameters());
          },
          updateUserData: (data) => {
            dispatch(onUpdateUserData(data));
          },
          updateUserIcon: (data) => {
            dispatch(onUpdateUserIcon(data));
          },
          updateUserPassword: (oldPass, pass) => {
            dispatch(onUpdateUserPassword(oldPass, pass));
          },
          deleteUser: (pass) => {
            dispatch(onDeleteUser(pass));
          },
          logoutUser: () => {
            dispatch(onLogoutUser());
          },
          addSuccess: (text) => {
            dispatch(actionCreators.addSuccess(text));
          },
        };
      };
    case "Exercise":
      return (dispatch) => {
        return {
          getTask: (taskId) => {
            dispatch(onGetTask(taskId));
          },
        };
      };
    case "DefParams":
      return (dispatch) => {
        return {
          changeExerciseState: (param) => {
            dispatch(onChangeExerciseState(param));
          },
        };
      };
    case "ExerciseText":
      return (dispatch) => {
        return {};
      };
    case "ExerciseTest":
      return (dispatch) => {
        return {
          createUserTask: (taskId, time, usercourse, correctness = 0) => {
            dispatch(onCreateUserTask(taskId, time, usercourse, correctness));
          },
          createAnswer: (usertaskId, number, answer, item) => {
            dispatch(onCreateAnswer(usertaskId, number, answer, item));
          },
          doneTask: (correctness) => {
            dispatch(onDoneTask(correctness));
          },
          createQER: (value, WPM, QU) => {
            dispatch(onCreateQER(value, WPM, QU));
          },
        };
      };
    case "TenThesis":
      return (dispatch) => {
        return {
          createAnswer: (usertaskId, number, answer, item) => {
            dispatch(onCreateAnswer(usertaskId, number, answer, item));
          },
          createLM: (value) => {
            dispatch(onCreateLM(value));
          },
          doneTask: (correctness) => {
            dispatch(onDoneTask(correctness));
          },
          createUserTask: (taskId, time, usercourse, correctness = 0) => {
            dispatch(onCreateUserTask(taskId, time, usercourse, correctness));
          },
        };
      };
    case "TenWords":
      return (dispatch) => {
        return {
          createVM: (value) => {
            dispatch(onCreateVM(value));
          },
          createVMWP: (value) => {
            dispatch(onCreateVMWP(value));
          },
          doneTask: (correctness) => {
            dispatch(onDoneTask(correctness));
          },
          createUserTask: (taskId, time, usercourse, correctness = 0) => {
            dispatch(onCreateUserTask(taskId, time, usercourse, correctness));
          },
        };
      };
    case "BOFIPiramids":
      return (dispatch) => {
        return {
          createBOFI: (value) => {
            dispatch(onCreateBOFI(value));
          },
          doneTask: (correctness) => {
            dispatch(onDoneTask(correctness));
          },
          createUserTask: (taskId, time, usercourse, correctness = 0) => {
            dispatch(onCreateUserTask(taskId, time, usercourse, correctness));
          },
        };
      };
    case "CountObjects":
      return (dispatch) => {
        return {
          createAA: (value) => {
            dispatch(onCreateAA(value));
          },
          doneTask: (correctness) => {
            dispatch(onDoneTask(correctness));
          },
          createUserTask: (taskId, time, usercourse, correctness = 0) => {
            dispatch(onCreateUserTask(taskId, time, usercourse, correctness));
          },
        };
      };

    default:
      return "undefined";
  }
}

export default mapDispatchToProps;
