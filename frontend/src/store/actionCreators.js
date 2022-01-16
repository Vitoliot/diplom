import Actions from "./actions";

const actionCreators = {
    removeError: function (id) {
        return {
            type: this.types.REMOVE_ERROR,
            id
        }
    },
    addError: function (text) {
        return {
            type: this.types.ADD_ERROR,
            text
        }
    },
    removeSuccess: function (id) {
        return {
            type: this.types.REMOVE_SUCCESS,
            id
        }
    },
    addSuccess: function (text) {
        return {
            type: this.types.ADD_SUCCESS,
            text
        }
    },
    apply_course_choicePage_sort : (course_sort) => {
        return {
            type: Actions.apply_course_choicePage_sort,
            course_sort
        }
    },
    break_course_choicePage_sort : () => {
        return {
            type: Actions.break_course_choicePage_sort,
        }
    },
    apply_task_choicePage_filters : () => {
        return {
            type: Actions.apply_task_choicePage_filters,
        }
    },
    apply_task_choicePage_task : (current_task_by_theme_and_id) => {
        return {
            type: Actions.apply_task_choicePage_task,
            current_task_by_theme_and_id
        }
    },
    select_courses_request_started : () => {
        return {
            type: Actions.select_courses_request_started,
        }
    },
    select_courses_request_failed : () => {
        return {
            type: Actions.select_courses_request_failed,
        }
    },
    select_courses_request_successed : (courses) => {
        return {
            type: Actions.select_courses_request_successed,
            courses
        }
    },
    select_tasks_request_started : () => {
        return {
            type: Actions.select_tasks_request_started,
        }
    },
    select_tasks_request_failed : () => {
        return {
            type: Actions.select_tasks_request_failed,
        }
    },
    select_tasks_request_successed : (tasks) => {
        return {
            type: Actions.select_tasks_request_successed,
            tasks,
        }
    },
}

export default actionCreators;