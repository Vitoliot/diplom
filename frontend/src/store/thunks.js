import actionCreators from "./actionCreators";
const axios = require('axios');

export function fetchTasks() {
        return async function (dispatch, getState, extraArgument) {
            dispatch(actionCreators.select_tasks_request_started())
            let theme = getState().task_choicePage.is_theme
            if (theme) {
                return await axios.get('education/task/all/theme')
                .then(
                response => dispatch(actionCreators.select_tasks_request_successed(response.data)),
                error => {
                    dispatch(actionCreators.select_tasks_request_failed());
                    dispatch(actionCreators.addError(error))
                }
                )
            }
            else {
                return await axios.get('education/task/all/type')
                .then(
                response => dispatch(actionCreators.select_tasks_request_successed(response.data)),
                error => {
                    dispatch(actionCreators.select_tasks_request_failed());
                    dispatch(actionCreators.addError(error))
                }
                )
            }
            }
    }


