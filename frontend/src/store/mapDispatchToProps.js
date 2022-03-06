import actionCreators from "./actionCreators";
import {
  addCourseToUser,
  fetchCourses,
  fetchTasks,
  fetchUserCourses,
  onSignIn,
  onSignUp,
} from "./thunks";

function mapDispatchToProps(component) {
  switch (component) {
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
        };
      };
    case "Course":
      return (dispatch) => {
        return {
          on_course_add: (course) => {
            dispatch(addCourseToUser(course));
          },
          on_init: (course) => {
            dispatch(fetchCourseData(course));
          },
          // on_answer_delete: (answer) => {
          //     return null
          // }
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
        
      }
    default:
      return "undefined";
  }
}

export default mapDispatchToProps;
