import actionCreators from "./actionCreators";
const axios = require('axios');

export function fetchTasks() {
        return async function (dispatch, getState, extraArgument) {
            dispatch(actionCreators.select_tasks_request_started())
            let theme = getState().task_choicePage.is_theme
            let url = 'education/task/all/type'
            if (theme) {
                url = 'education/task/all/theme'
            }
            return await axios.get(url)
            .then(
            response => dispatch(actionCreators.select_tasks_request_successed(response.data)),
            error => {
                dispatch(actionCreators.select_tasks_request_failed());
                dispatch(actionCreators.addError(error))
            }
            )
            }
    }


export function fetchCourses() {
    return async function (dispatch, getState, extraArgument) {
        dispatch(actionCreators.select_courses_request_started())
        let params = getState().course_sort
        let url = 'education/course/all?ordering='
        Object.keys(params).forEach(element => {
            if (element === 'date' && params[element]){
                if (!params['rule']) url += 'date_create,'
                else url += '-date_create,'
            }
            if (element === 'alphabet' && params[element]){
                if (!params['rule']) url += 'title,'
                else url += '-title,'
            }
        });
        return await axios.get(url)
        .then(
        response => {
            dispatch(actionCreators.apply_course_choicePage_sort_isChange_off())
            dispatch(actionCreators.select_courses_request_successed(response.data))
        },
        error => {
            dispatch(actionCreators.select_courses_request_failed());
            dispatch(actionCreators.addError(error))
        }
        )
    }
}

export function addCourseToUser(course){
    return async function (dispatch, getState, extraArgument) {
        dispatch()
        user = getState().user.id
        let url = 'activities/usercourses/new'
        return await axios.post(url, {user:user,course:course})
        .then(
            response => {
                dispatch(actionCreators.addSuccess('Вы успешно записаны на курс'))
                dispatch(actionCreators.select_user_courses_request_successed(course))
            },
            error => {
                dispatch(actionCreators.addError(error))
            }
            )
        }
    }

export function fetchUserCourses(){
    return async function (dispatch, getState, extraArgument) {
        dispatch(actionCreators.select_user_courses_request_started())
        user = getState().user.id
        let url = `activities/${user}/courses`
        return await axios.get(url)
        .then(
        response => dispatch(actionCreators.select_user_courses_request_successed(response.data)),
        error => {
            dispatch(actionCreators.select_user_courses_request_failed());
            dispatch(actionCreators.addError(error))
        }
        )
    }
}

export function fetchCourseData(course, isLogged){
    return async function (dispatch, getState, extraArgument) {
        dispatch(actionCreators.select_course_with_module_request_started())
        let url = ""
        if (isLogged) {
            user = getState().user.id
            url += `activities/${user}/${course}`
        }
        else {
            url += `education/course/${course}`
        }
        return await axios.get(url)
        .then(
        response => dispatch(actionCreators.select_course_with_module_request_successed(response.data)),
        error => {
            dispatch(actionCreators.select_course_with_module_request_failed());
            dispatch(actionCreators.addError(error))
        }
        )
    }
}

