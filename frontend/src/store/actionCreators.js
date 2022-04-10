import Actions from "./actions";

const actionCreators = {
  removeError: function (id) {
    return {
      type: Actions.remove_error,
      id,
    };
  },
  addError: function (text, status, dispatch) {
    return {
      type: Actions.add_error,
      text,
      status,
      dispatch,
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
  select_task_request_started: () => {
    return {
      type: Actions.select_task_request_started,
    };
  },
  select_task_request_failed: () => {
    return {
      type: Actions.select_task_request_failed,
    };
  },
  select_task_request_successed: (data) => {
    return {
      type: Actions.select_task_request_successed,
      data,
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
  select_course_with_module_request_successed_to_unathorized: (course) => {
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
      refresh,
    };
  },
  sign_up_request_started: () => {
    return {
      type: Actions.sign_up_request_started,
    };
  },
  sign_up_request_failed: () => {
    return {
      type: Actions.sign_up_request_failed,
    };
  },
  sign_up_request_successed: (thing) => {
    return {
      type: Actions.sign_up_request_successed,
      thing,
    };
  },
  select_user_data_started: () => {
    return {
      type: Actions.select_user_data_started,
    };
  },
  select_user_data_failed: () => {
    return {
      type: Actions.select_user_data_failed,
    };
  },
  select_user_data_successed: (data) => {
    return {
      type: Actions.select_user_data_successed,
      data,
    };
  },
  update_profile_data_request_started: () => {
    return {
      type: Actions.update_profile_data_request_started,
    };
  },
  update_profile_data_request_failed: () => {
    return {
      type: Actions.update_profile_data_request_failed,
    };
  },
  update_profile_data_request_succesed: (data) => {
    return {
      type: Actions.update_profile_data_request_successed,
      data,
    };
  },
  update_profile_icon_request_started: () => {
    return {
      type: Actions.update_profile_icon_request_started,
    };
  },
  update_profile_icon_request_failed: () => {
    return {
      type: Actions.update_profile_icon_request_failed,
    };
  },
  update_profile_icon_request_succesed: (data) => {
    return {
      type: Actions.update_profile_icon_request_successed,
      data,
    };
  },
  update_profile_password_request_started: () => {
    return {
      type: Actions.update_profile_password_request_started,
    };
  },
  update_profile_password_request_failed: () => {
    return {
      type: Actions.update_profile_password_request_failed,
    };
  },
  update_profile_password_request_successed: () => {
    return {
      type: Actions.update_profile_password_request_successed,
    };
  },
  delete_profile_request_started: () => {
    return {
      type: Actions.delete_profile_request_started,
    };
  },
  delete_profile_request_failed: () => {
    return {
      type: Actions.delete_profile_request_failed,
    };
  },
  delete_profile_request_successed: () => {
    return {
      type: Actions.delete_profile_request_successed,
    };
  },
  logout_request_started: () => {
    return {
      type: Actions.logout_request_started,
    };
  },
  logout_request_failed: () => {
    return {
      type: Actions.logout_request_failed,
    };
  },
  logout_request_successed: () => {
    return {
      type: Actions.logout_request_successed,
    };
  },
  select_user_params_started: () => {
    return {
      type: Actions.select_user_params_started,
    };
  },
  select_user_params_failed: () => {
    return {
      type: Actions.select_user_params_failed,
    };
  },
  select_user_params_successed: (data) => {
    return {
      type: Actions.select_user_params_successed,
      data,
    };
  },
  task_frontend_update: (task) => {
    return {
      type: Actions.task_frontend_update,
      task,
    };
  },
  delete_answer_request_started: () => {
    return {
      type: Actions.delete_answer_request_started,
    };
  },
  delete_answer_request_failed: () => {
    return {
      type: Actions.delete_answer_request_failed,
    };
  },
  delete_answer_request_successed: () => {
    return {
      type: Actions.delete_answer_request_successed,
    };
  },
  create_today_complete_tasks_started: () => {
    return {
      type: Actions.create_today_complete_tasks_started,
    };
  },
  create_today_complete_tasks_failed: () => {
    return {
      type: Actions.create_today_complete_tasks_failed,
    };
  },
  create_today_complete_tasks_successed: () => {
    return {
      type: Actions.create_today_complete_tasks_successed,
    };
  },
  update_today_complete_tasks_started: () => {
    return {
      type: Actions.update_today_complete_tasks_started,
    };
  },
  update_today_complete_tasks_failed: () => {
    return {
      type: Actions.update_today_complete_tasks_failed,
    };
  },
  update_today_complete_tasks_successed: () => {
    return {
      type: Actions.update_today_complete_tasks_successed,
    };
  },
  select_today_complete_tasks_started: () => {
    return {
      type: Actions.select_today_complete_tasks_started,
    };
  },
  select_today_complete_tasks_failed: () => {
    return {
      type: Actions.select_today_complete_tasks_failed,
    };
  },
  select_today_complete_tasks_successed: (data) => {
    return {
      type: Actions.select_today_complete_tasks_successed,
      data,
    };
  },
  course_frontend_update: (data) => {
    return {
      type: Actions.course_frontend_update,
      data,
    };
  },
  create_usertask_request_started: () => {
    return {
      type: Actions.create_usertask_request_started,
    };
  },
  create_usertask_request_failed: () => {
    return {
      type: Actions.create_usertask_request_failed,
    };
  },
  create_usertask_request_successed: (data) => {
    return {
      type: Actions.create_usertask_request_successed,
      data,
    };
  },
  create_answer_request_started: () => {
    return {
      type: Actions.create_answer_request_started,
    };
  },
  create_answer_request_failed: () => {
    return {
      type: Actions.create_answer_request_failed,
    };
  },
  create_answer_request_successed: () => {
    return {
      type: Actions.create_answer_request_successed,
    };
  },
  task_is_complete_update: (isComplete, correctness) => {
    return {
      type: Actions.task_is_complete_update,
      isComplete,
      correctness,
    };
  },
  changeExerciseState: (isParam, param) => {
    return {
      type: Actions.changeExerciseState,
      isParam,
      param,
    };
  },
  newQERValue: (value, WPM, QU) => {
    return {
      type: Actions.newQERValue,
      value,
    };
  },
  newVMValue: (value) => {
    return {
      type: Actions.newVMValue,
      value,
    };
  },
  newVMWPValue: (value) => {
    return {
      type: Actions.newVMWPValue,
      value,
    };
  },
  newLMValue: (value) => {
    return {
      type: Actions.newLMValue,
      value,
    };
  },
  newBOFIValue: (value) => {
    return {
      type: Actions.newBOFIValue,
      value,
    };
  },
  newAAalue: (value) => {
    return {
      type: Actions.newAAalue,
      value,
    };
  },
};

export default actionCreators;
