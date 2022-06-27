import initialState from "./initialState";

function mapStateToProps(component) {
  switch (component) {
    case "TaskChoice": {
      return function (state) {
        return {
          taskChoicePage: state.taskChoicePage,
        };
      };
    }
    case "TaskCatalog": {
      return function (state) {
        return {
          tasks: state.task_choicePage.tasks,
          is_theme: state.task_choicePage.is_theme,
          is_loading: state.task_choicePage.is_loading,
          is_changed: state.task_choicePage.is_changed,
          current_task_by_theme_and_id:
            state.task_choicePage.current_task_by_theme_and_id,
        };
      };
    }
    case "Header": {
      return function (state = initialState) {
        return {
          isLogged: state.user_for_profile.data.id ? true : false,
          userImgPath: state.user_for_profile.data.icon
            ? state.user_for_profile.data.icon
            : "static/images/person.png",
        };
      };
    }
    case "AuthorizeRoute": {
      return function (state) {
        return {
          isLogged: state.user_for_profile.data.id ? true : false,
        };
      };
    }
    case "CourseCatalog": {
      return (state) => {
        return {
          course_choicePage: state.course_choicePage,
          course_sort: state.course_sort,
          isLogged: state.user_for_profile.data.id ? true : false,
        };
      };
    }
    case "CourseCard": {
      return (state) => {
        return {
          isLogged: state.user_for_profile.data.id ? true : false,
          course_sort: state.course_sort,
          course_choicePage: state.course_choicePage,
        };
      };
    }
    case "Course": {
      return (state) => {
        return {
          current_course: state.current_course,
          todayCompleteTasks: state.todayCompleteTasks,
          isLogged: state.user_for_profile.data.id ? true : false,
          taskInDay: state.user_for_profile.data.task_in_day,
        };
      };
    }
    case "Auth": {
      return (state) => {
        return {
          isLogged: state.user_for_profile.data.id ? true : false,
          isLoading: state.user_for_profile.isLoading,
        };
      };
    }
    case "EventsView": {
      return (state) => {
        return {
          errors: state.errors.content,
          successes: state.successes.content,
        };
      };
    }
    case "Profile": {
      return (state) => {
        return {
          user_for_profile: state.user_for_profile,
          user_params: state.user_params,
          user_answers: null,
        };
      };
    }
    case "Exercise": {
      return (state) => {
        return {
          current_task: state.current_task,
          exerciseState: state.exerciseState,
          isLogged: state.user_for_profile.data.id ? true : false,
        };
      };
    }
    case "DefParams": {
      return (state) => {
        return {
          user_params: state.user_params,
          new_params: state.new_params,
        };
      };
    }
    case "ExerciseText": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    case "ExerciseTest": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          usertaskId: state.current_task.usertask
            ? state.current_task.usertask.id
            : null,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    case "TenThesis": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          usertaskId: state.current_task.usertask
            ? state.current_task.usertask.id
            : null,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    case "TenWords": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          usertaskId: null,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    case "BOFIPiramids": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          usertaskId: state.current_task.usertask
            ? state.current_task.usertask.id
            : null,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    case "CountObjects": {
      return (state) => {
        return {
          item:
            state.current_task.data.items.length != 0
              ? state.current_task.data.items[0]
              : null,
          isLogged: state.user_for_profile.data.id ? true : false,
          usertaskId: state.current_task.usertask
            ? state.current_task.usertask.id
            : null,
          taskId: state.current_task.data.id,
          usercourseId: state.current_course.data.id,
        };
      };
    }
    default:
      return "undefined";
  }
}

export default mapStateToProps;
