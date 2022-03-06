import Actions from "./actions";

const actionCreators = {
  removeError: function (id) {
    return {
      type: Actions.remove_error,
      id,
    };
  },
  addError: function (text) {
    return {
      type: Actions.add_error,
      text,
    };
  },
  removeSuccess: function (id) {
    return {
      type: Actions.remove_success,
      id,
    };
  },
  addSuccess: function (text) {
    return {
      type: Actions.add_success,
      text,
    };
  },
  apply_course_choicePage_sort: (course_sort) => {
    return {
      type: Actions.apply_course_choicePage_sort,
      course_sort,
    };
  },
  apply_course_choicePage_sort_isChange_off: () => {
    return {
      type: Actions.apply_course_choicePage_sort_isChange_off,
    };
  },
  break_course_choicePage_sort: () => {
    return {
      type: Actions.break_course_choicePage_sort,
    };
  },
  apply_task_choicePage_filters: () => {
    return {
      type: Actions.apply_task_choicePage_filters,
    };
  },
  apply_task_choicePage_task: (current_task_by_theme_and_id) => {
    return {
      type: Actions.apply_task_choicePage_task,
      current_task_by_theme_and_id,
    };
  },
  select_courses_request_started: () => {
    return {
      type: Actions.select_courses_request_started,
    };
  },
  select_courses_request_failed: () => {
    return {
      type: Actions.select_courses_request_failed,
    };
  },
  select_courses_request_successed: (courses) => {
    return {
      type: Actions.select_courses_request_successed,
      courses,
    };
  },
  select_user_courses_request_started: () => {
    return {
      type: Actions.select_user_courses_request_started,
    };
  },
  select_user_courses_request_failed: () => {
    return {
      type: Actions.select_user_courses_request_failed,
    };
  },
  select_user_courses_request_successed: (courses) => {
    return {
      type: Actions.select_user_courses_request_successed,
      courses,
    };
  },
  select_tasks_request_started: () => {
    return {
      type: Actions.select_tasks_request_started,
    };
  },
  select_tasks_request_failed: () => {
    return {
      type: Actions.select_tasks_request_failed,
    };
  },
  select_tasks_request_successed: (tasks) => {
    return {
      type: Actions.select_tasks_request_successed,
      tasks,
    };
  },
  create_usercourses_request_started: () => {
    return {
      type: Actions.create_usercourses_request_started,
    };
  },
  create_usercourses_request_successed: (course) => {
    return {
      type: Actions.create_usercourses_request_successed,
      course,
    };
  },
  create_usercourses_request_failed: () => {
    return {
      type: Actions.create_usercourses_request_failed,
    };
  },
  update_usercourses_request_started: () => {
    return {
      type: Actions.update_usercourses_request_started,
    };
  },
  update_usercourses_request_successed: () => {
    return {
      type: Actions.update_usercourses_request_successed,
    };
  },
  update_usercourses_request_failed: () => {
    return {
      type: Actions.update_usercourses_request_failed,
    };
  },
  select_course_with_module_request_started: () => {
    return {
      type: Actions.select_course_with_module_request_started,
    };
  },
  select_course_with_module_request_failed: () => {
    return {
      type: Actions.select_course_with_module_request_failed,
    };
  },
  select_course_with_module_request_successed: (course) => {
    return {
      type: Actions.select_course_with_module_request_successed,
      course,
    };
  },
  auth_request_started: () => {
    return {
      type: Actions.auth_request_started,
    };
  },
  auth_request_failed: () => {
    return {
      type: Actions.auth_request_failed,
    };
  },
  auth_request_successed: (refresh) => {
    return {
      type: Actions.auth_request_successed,
      refresh
    };
  },
  sign_up_request_started: () => {
      return {
          type: Actions.sign_up_request_started,
      }
  },
  sign_up_request_failed: () => {
      return {
          type: Actions.sign_up_request_failed,
      }
  },
  sign_up_request_successed: (thing) => {
      return {
          type: Actions.sign_up_request_successed,
          thing
      }
  },
  select_user_data_started: () => {
      return {
          type: Actions.select_user_data_started,
      }
  },
  select_user_data_failed: () => {
      return {
          type: Actions.select_user_data_failed,
      }
  },
  select_user_data_successed: (data) => {
      return {
          type: Actions.select_user_data_successed,
          data
      }
  },
};

export default actionCreators;
