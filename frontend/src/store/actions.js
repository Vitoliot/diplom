const actions = {
  apply_course_choicePage_sort: "apply_course_choicePage_sort",
  apply_course_choicePage_sort_isChange_off:
    "apply_course_choicePage_sort_isChange_off",
  apply_task_choicePage_filters: "apply_task_choicePage_filters",
  apply_task_choicePage_task: "apply_task_choicePage_task",
  break_course_choicePage_sort: "break_course_choicePage_sort",
  remove_error: "remove_error",
  add_error: "add_error",
  remove_success: "remove_success",
  add_success: "add_success",
  select_courses_request_started: "select_courses_request_started",
  select_courses_request_failed: "select_courses_request_failed",
  select_courses_request_successed: "select_courses_request_successed",
  select_course_with_module_request_started:
    "select_course_with_module_request_started",
  select_course_with_module_request_failed:
    "select_course_with_module_request_failed",
  select_course_with_module_request_successed:
    "select_course_with_module_request_successed",
  select_course_with_module_request_successed_to_unathorized:
    "select_course_with_module_request_successed_to_unathorized",
  select_user_courses_request_started: "select_user_courses_request_started",
  select_user_courses_request_failed: "select_user_courses_request_failed",
  select_user_courses_request_successed:
    "select_user_courses_request_successed",
  select_tasks_request_started: "select_tasks_request_started",
  select_tasks_request_failed: "select_tasks_request_failed",
  select_tasks_request_successed: "select_tasks_request_successed",
  select_task_request_started: "select_tasks_request_started",
  select_task_request_failed: "select_task_request_failed",
  select_task_request_successed: "select_task_request_successed",
  task_frontend_update: "task_frontend_update",
  course_frontend_update: "course_frontend_update",
  select_answer_request_started: "select_answer_request_started",
  select_answer_request_successed: "select_answer_request_successed",
  select_answer_request_failed: "select_answer_request_failed",
  select_user_data_started: "select_user_data_started",
  select_user_data_failed: "select_user_data_failed",
  select_user_data_successed: "select_user_data_successed",
  select_user_params_started: "select_user_params_started",
  select_user_params_failed: "select_user_params_failed",
  select_user_params_successed: "select_user_params_successed",
  create_today_complete_tasks_started: "create_today_complete_tasks_started",
  create_today_complete_tasks_failed: "create_today_complete_tasks_failed",
  create_today_complete_tasks_successed:
    "create_today_complete_tasks_successed",
  select_today_complete_tasks_started: "select_today_complete_tasks_started",
  select_today_complete_tasks_failed: "select_today_complete_tasks_failed",
  select_today_complete_tasks_successed:
    "update_today_complete_tasks_successed",
  update_today_complete_tasks_started: "update_today_complete_tasks_started",
  update_today_complete_tasks_failed: "update_today_complete_tasks_failed",
  update_today_complete_tasks_successed:
    "select_today_complete_tasks_successed",
  auth_request_started: "auth_request_started",
  auth_request_successed: "auth_request_successed",
  auth_request_failed: "auth_request_failed",
  user_auth_check_request_started: "user_auth_check_request_started",
  user_auth_check_request_successed: "user_auth_check_request_successed",
  user_auth_check_request_failed: "user_auth_check_request_failed",
  sign_up_request_started: "sign_up_request_started",
  sign_up_request_successed: "sign_up_request_successed",
  sign_up_request_failed: "sign_up_request_failed",
  user_nickname_request_started: "user_nickname_request_started",
  user_nickname_request_successed: "user_nickname_request_successed",
  user_nickname_request_failed: "user_nickname_request_failed",
  logout_request_started: "logout_request_started",
  logout_request_successed: "logout_request_successed",
  logout_request_failed: "logout_request_failed",
  nullify_guest: "nullify_guest",
  update_profile_data_request_started: "update_profile_data_request_started",
  update_profile_data_request_successed:
    "update_profile_data_request_successed",
  update_profile_data_request_failed: "update_profile_data_request_failed",
  update_profile_icon_request_started: "update_profile_icon_request_started",
  update_profile_icon_request_successed:
    "update_profile_icon_request_successed",
  update_profile_icon_request_failed: "update_profile_icon_request_failed",
  update_profile_password_request_started:
    "update_profile_password_request_started",
  update_profile_password_request_successed:
    "update_profile_password_request_successed",
  update_profile_password_request_failed:
    "update_profile_password_request_failed",
  task_is_complete_update: "task_is_complete_update",
  delete_profile_request_started: "delete_profile_data_request_started",
  delete_profile_request_successed: "delete_profile_data_request_successed",
  delete_profile_request_failed: "delete_profile_data_request_failed",
  create_answer_request_started: "create_answer_request_started",
  create_answer_request_successed: "create_answer_request_successed",
  create_answer_request_failed: "create_answer_request_failed",
  create_usertask_request_started: "create_usertask_request_started",
  create_usertask_request_successed: "create_usertask_request_successed",
  create_usertask_request_failed: "create_usertask_request_failed",
  update_answer_request_started: "update_answer_request_started",
  update_answer_request_successed: "update_answer_request_successed",
  update_answer_request_failed: "update_answer_request_failed",
  delete_answer_request_started: "delete_answer_request_started",
  delete_answer_request_successed: "delete_answer_request_successed",
  delete_answer_request_failed: "delete_answer_request_failed",
  cookie_agreement: "cookie_agreement",
  create_usercourses_request_started: "create_usercourses_request_started",
  create_usercourses_request_successed: "create_usercourses_request_successed",
  create_usercourses_request_failed: "create_usercourses_request_failed",
  update_usercourses_request_started: "update_usercourses_request_started",
  update_usercourses_request_successed: "update_usercourses_request_successed",
  update_usercourses_request_failed: "update_usercourses_request_failed",
  changeExerciseState: "changeExerciseState",
  newQERValue: "newQERValue",
  newVMValue: "newVMValue",
  newVMWPValue: "newVMWPValue",
  newLMValue: "newLMValue",
  newBOFIValue: "newBOFIValue",
  newAAalue: "newAAValue",
  select_tasks_for_task_choice_started: "select_tasks_for_task_choice_started",
  select_tasks_for_task_choice_failed: "select_tasks_for_task_choice_failed",
  select_tasks_for_task_choice_successed:
    "select_tasks_for_task_choice_successed",
  select_params_for_task_choice_started:
    "select_params_for_task_choice_started",
  select_params_for_task_choice_failed: "select_params_for_task_choice_failed",
  select_params_for_task_choice_successed:
    "select_params_for_task_choice_successed",
  task_frontend_update_started: "task_frontend_update_started",
  select_paramtask_request_successed: "select_paramtask_request_successed", 
};

export default actions;
