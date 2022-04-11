import actions from "./actions";
import initialState from "./initialState";
import { afterSignIn, tokenUpdate } from "./thunks";

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
        if (action.status === "401") action.dispatch(tokenUpdate());
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
      case actions.task_is_complete_update:
        return {
          is_fecthed: false,
          is_loading: false,
          is_changed: true,
          is_theme: state.is_theme,
          tasks: state.tasks,
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
      case actions.logout_request_successed:
        return {
          is_fecthed: state.is_fecthed,
          is_loading: state.is_loading,
          is_changed: true,
          is_theme: state.is_theme,
          tasks: state.tasks,
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
      case actions.auth_request_successed:
        return {
          is_fecthed: state.is_fecthed,
          is_loading: state.is_loading,
          is_changed: true,
          is_theme: state.is_theme,
          tasks: state.tasks,
          current_task_by_theme_and_id: state.current_task_by_theme_and_id,
        };
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
      case actions.logout_request_successed:
        return {
          is_fecthed: false,
          is_loading: false,
          is_changed: true,
          courses: state.courses,
          usercourses: state.usercourses,
        };
      case actions.auth_request_successed:
        return {
          is_fecthed: false,
          is_loading: false,
          is_changed: true,
          courses: state.courses,
          usercourses: state.usercourses,
        };
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
          usercourses: action.courses,
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
      case actions.logout_request_successed:
        return {
          isFetched: false,
          isLoading: false,
          isChanged: true,
          data: state.data,
        };
      case actions.auth_request_successed:
        return {
          isFetched: false,
          isLoading: false,
          isChanged: true,
          data: state.data,
        };
      case actions.select_course_with_module_request_started:
        return {
          isFetched: false,
          isLoading: true,
          isChanged: false,
          data: state.data,
        };
      case actions.select_course_with_module_request_failed:
        return {
          isFetched: false,
          isLoading: false,
          isChanged: false,
          data: state.data,
        };
      case actions.select_course_with_module_request_successed:
        return {
          isFetched: true,
          isLoading: false,
          isChanged: false,
          data: action.course,
        };
      case actions.select_course_with_module_request_successed_to_unathorized:
        return {
          isFetched: true,
          isLoading: false,
          isChanged: false,
          data: action.course,
        };
      case actions.course_frontend_update:
        return {
          isFetched: false,
          isLoading: false,
          isChanged: false,
          data: action.data,
        };
      case actions.task_is_complete_update:
        return {
          isFetched: state.isFetched,
          isLoading: state.isLoading,
          isChanged: true,
          data: state.data,
        };
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
      case actions.select_user_data_started:
        return {
          isLoading: true,
          isFetched: false,
          data: { id: null },
        };
      case actions.select_user_data_failed:
        return {
          isLoading: false,
          isFetched: false,
          data: { id: null },
        };
      case actions.select_user_data_successed:
        return {
          isLoading: false,
          isFetched: true,
          data: action.data,
        };
      case actions.update_user_icon_successed:
        return {
          isLoading: state.isLoading,
          isFetched: state.isFetched,
          data: Object.assign({}, state.data, { icon: action.data.icon }),
        };
      case actions.logout_request_successed:
        return {
          isLoading: false,
          isFetched: false,
          data: { id: null },
        };
      case actions.delete_profile_request_successed:
        return {
          isLoading: false,
          isFetched: false,
          data: { id: null },
        };
      default:
        return state;
    }
  },
  user_params: (state = initialState, action) => {
    switch (action.type) {
      case actions.select_user_params_started:
        return {
          isLoading: true,
          isFetched: false,
          data: {},
        };
      case actions.select_user_params_failed:
        return {
          isLoading: false,
          isFetched: false,
          data: {},
        };
      case actions.select_user_params_successed:
        return {
          isLoading: false,
          isFetched: true,
          data: action.data,
        };
      case actions.logout_request_successed:
        return {
          isLoading: false,
          isFetched: false,
          data: {},
        };
      case actions.delete_profile_request_successed:
        return {
          isLoading: false,
          isFetched: false,
          data: {},
        };
      case actions.newAAalue:
      case actions.newQERValue:
      case actions.newBOFIValue:
      case actions.newVMValue:
      case actions.newVMWPValue:
      case actions.newLMValue:
        return {
          isLoading: false,
          isFetched: false,
          data: state.data,
        };
      default:
        return state;
    }
  },
  current_task: (state = initialState, action) => {
    switch (action.type) {
      case actions.changeExerciseState:
        return {
          isLoading: false,
          isFetched: false,
          isChanged: true,
          isComplete: false,
          data: state.data,
          usertask: state.usertask,
        };
      case actions.task_frontend_update:
        return {
          isLoading: false,
          isFetched: false,
          isChanged: true,
          isComplete: false,
          data: action.task,
          usertask: state.usertask,
        };
      case actions.task_is_complete_update:
        return {
          isLoading: state.isLoading,
          isFetched: state.isFetched,
          isChanged: state.isChanged,
          isComplete: action.isComplete,
          correctness: action.correctness,
          data: state.data,
          usertask: state.usertask,
        };
      case actions.create_usertask_request_successed:
        return {
          isLoading: state.isLoading,
          isFetched: state.isFetched,
          isChanged: false,
          isComplete: state.isComplete,
          data: state.data,
          usertask: action.data.id,
        };
      case actions.select_task_request_started:
        return {
          isLoading: true,
          isFetched: false,
          isChanged: false,
          isComplete: false,
          data: state.data,
          usertask: state.usertask,
        };
      case actions.select_task_request_failed:
        return {
          isLoading: false,
          isFetched: false,
          isChanged: false,
          isComplete: false,
          data: state.data,
          usertask: state.usertask,
        };
      case actions.select_task_request_successed:
        return {
          isLoading: false,
          isFetched: true,
          isChanged: false,
          isComplete: false,
          data: action.data,
          usertask: state.usertask,
        };
      default:
        return state;
    }
  },
  todayCompleteTasks: (state = initialState, action) => {
    switch (action.type) {
      case actions.create_today_complete_tasks_started:
        return {
          isLoading: true,
          isFetched: false,
          data: {},
        };
      case actions.create_today_complete_tasks_failed:
        return {
          isLoading: false,
          isFetched: false,
          data: {},
        };
      case actions.create_today_complete_tasks_successed:
        return {
          isLoading: false,
          isFetched: true,
          data: action.data,
        };
      case actions.select_today_complete_tasks_successed:
        return {
          isLoading: false,
          isFetched: true,
          data: action.data,
        };
      default:
        return state;
    }
  },
  new_params: (state = initialState, action) => {
    switch (action.type) {
      case actions.newAAalue:
        return {
          BOFI: state.BOFI,
          VM: state.VM,
          VMWP: state.VMWP,
          LM: state.LM,
          AA: { value: action.value },
          QER: state.QER,
        };
      case actions.newQERValue:
        return {
          BOFI: state.BOFI,
          VM: state.VM,
          VMWP: state.VMWP,
          LM: state.LM,
          AA: state.AA,
          QER: { value: action.value, WPM: action.WPM, QU: action.QU },
        };
      case actions.newBOFIValue:
        return {
          BOFI: { value: action.value },
          VM: state.VM,
          VMWP: state.VMWP,
          LM: state.LM,
          AA: state.AA,
          QER: state.QER,
        };
      case actions.newVMValue:
        return {
          BOFI: state.BOFI,
          VM: { value: action.value },
          VMWP: state.VMWP,
          LM: state.LM,
          AA: state.AA,
          QER: state.QER,
        };
      case actions.newVMWPValue:
        return {
          BOFI: state.BOFI,
          VM: state.VM,
          VMWP: { value: action.value },
          LM: state.LM,
          AA: state.AA,
          QER: state.QER,
        };
      case actions.newLMValue:
        return {
          BOFI: state.BOFI,
          VM: state.VM,
          VMWP: state.VMWP,
          LM: { value: action.value },
          AA: state.AA,
          QER: state.QER,
        };
      case actions.nullNewParams:
        return {
          BOFI: null,
          VM: null,
          VMWP: null,
          LM: null,
          AA: null,
          QER: null,
        };
      default:
        return state;
    }
  },
  exerciseState: (state = initialState, action) => {
    switch (action.type) {
      case actions.changeExerciseState:
        return {
          isParam: action.isParam,
          param: action.param,
        };
      default:
        return state;
    }
  },
  taskChoicePage: (state = initialState, action) => {
    switch (action.type) {
      case actions.select_params_for_task_choice_started:
        return {
          isLoading: true,
          isFetched: false,
          isChanged: false,
          params: state.params,
          tasks: state.tasks,
        };
      case actions.select_params_for_task_choice_failed:
        return {
          isLoading: false,
          isFetched: false,
          isChanged: false,
          params: state.params,
          tasks: state.tasks,
        };
      case actions.select_params_for_task_choice_successed:
        return {
          isLoading: false,
          isFetched: true,
          isChanged: false,
          params: action.data,
          tasks: state.tasks,
        };
      case actions.select_tasks_for_task_choice_started:
        return {
          isLoading: true,
          isFetched: true,
          isChanged: false,
          params: state.params,
          tasks: state.tasks,
        };
      case actions.select_tasks_for_task_choice_successed:
        return {
          isLoading: false,
          isFetched: true,
          isChanged: false,
          params: state.params,
          tasks: action.data,
        };
      default:
        return state;
    }
  },
};

export default Reducers;
