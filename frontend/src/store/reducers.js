import actions from "./actions";
import initialState from "./initialState";
import { afterSignIn } from "./thunks";

const Reducers = {
  cookie: (state = initialState, action) => {
    switch (action.type) {
      case actions.cookie_agreement: {
        localStorage.setItem("knowAboutCookie", true);
        return localStorage.getItem("knowAboutCookie");
      }
      default:
        return state;
    }
  },
  errors: (state = initialState, action) => {
    switch (action.type) {
      case actions.remove_error: {
        let ind = state.content.findIndex((e) => e.id === action.id);

        return {
          content: [
            ...state.content.slice(0, ind),
            ...state.content.slice(ind + 1, state.content.length),
          ],
        };
      }
      case actions.add_error: {
        console.log("error added", action);
        return {
          content: state.content.concat({
            text: action.text,
            type: "error",
            created: Date.now(),
          }),
        };
      }
      default:
        return state;
    }
  },
  successes: (state = initialState, action) => {
    switch (action.type) {
      case actions.add_success: {
        return {
          content: state.content.concat({
            text: action.text,
            type: "success",
            created: Date.now(),
          }),
        };
      }
      case actions.remove_success: {
        let ind = state.content.findIndex((e) => e.id === action.id);
        return {
          content: [
            ...state.content.slice(0, ind),
            ...state.content.slice(ind + 1, state.content.length),
          ],
        };
      }
      default:
        return state;
    }
  },
  course_sort: (state = initialState, action) => {
    switch (action.type) {
      case actions.apply_course_choicePage_sort:
        return action.course_sort;
      case actions.break_course_choicePage_sort:
        return {
          date: false,
          alphabet: false,
          rule: false,
          is_changed: true,
        };
      case actions.apply_course_choicePage_sort_isChange_off:
        return {
          date: state.date,
          alphabet: state.alphabet,
          rule: state.rule,
          is_changed: false,
        };
      default:
        return state;
    }
  },
  task_choicePage: (state = initialState, action) => {
    switch (action.type) {
      case actions.apply_task_choicePage_filters:
        return {
          is_fecthed: state.is_fecthed,
          is_loading: state.is_loading,
          is_changed: true,
          is_theme: !state.is_theme,
          tasks: state.tasks,
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
      case actions.apply_task_choicePage_task:
        return {
          is_fecthed: state.is_fecthed,
          is_loading: state.is_loading,
          is_changed: false,
          is_theme: state.is_theme,
          tasks: state.tasks,
          current_task_by_theme_and_id: action.current_task_by_theme_and_id,
        };
      case actions.select_tasks_request_started:
        return {
          is_fecthed: false,
          is_loading: true,
          is_changed: false,
          is_theme: state.is_theme,
          tasks: [],
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
      case actions.select_tasks_request_successed:
        return {
          is_fecthed: true,
          is_loading: false,
          is_changed: false,
          is_theme: state.is_theme,
          tasks: action.tasks,
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
      case actions.select_tasks_request_failed:
        return {
          is_fecthed: false,
          is_loading: false,
          is_changed: false,
          is_theme: false,
          tasks: [],
          current_task_by_theme_and_id: [null, null],
        };
      default:
        return state;
    }
  },
  course_choicePage: (state = initialState, action) => {
    switch (action.type) {
      case actions.select_courses_request_started:
      case actions.select_user_courses_request_started:
        return {
          is_fecthed: false,
          is_loading: true,
          courses: state.courses,
          usercourses: state.usercourses,
        };
      case actions.select_courses_request_successed:
        return {
          is_fecthed: true,
          is_loading: false,
          courses: action.courses,
          usercourses: state.usercourses,
        };
      case actions.select_user_courses_request_successed:
        return {
          is_fecthed: true,
          is_loading: false,
          courses: state.courses,
          usercourses: state.usercourses + { course: action.course },
        };
      case actions.select_courses_request_failed:
      case actions.select_user_courses_request_failed:
        return {
          is_fecthed: false,
          is_loading: false,
          courses: state.courses,
          usercourses: state.usercourses,
        };
      default:
        return state;
    }
  },
  current_course: (state = initialState, action) => {
    switch (action.type) {
      case actions.select_course_with_module_request_started:
        return {
          is_fecthed: false,
          is_loading: true,
          course: state.course,
        };
      case actions.select_course_with_module_request_failed:
        return {
          is_fecthed: false,
          is_loading: false,
          course: state.course,
        };
      case actions.select_course_with_module_request_successed:
        return {
          is_fecthed: true,
          is_loading: false,
          course: action.course,
        };
      default:
        return state;
    }
  },
  user: (state = initialState, action) => {
    switch (action.type) {
      case actions.select_user_data_successed:
        return action.data;
      default:
        return state;
    }
  },
  refreshToken: (state = initialState, action) => {
    switch (action.type) {
      case actions.auth_request_successed:
        return action.refresh;
      default:
        return state;
    }
  },
  user_for_profile: (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  current_task: (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
};

export default Reducers;
