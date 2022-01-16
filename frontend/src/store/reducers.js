import actions from "./actions";
import initialState from "./initialState";

const Reducers = {
    course_sort: (state = initialState, action) => {
        switch(action.type) {
            case actions.apply_course_choicePage_sort : return action.course_sort;
            case actions.break_course_choicePage_sort : return {
                date : false,
                alphabet : false}
            default: {
                return state;
            }
        }
    },
    task_choicePage : (state = initialState, action) => {
        switch(action.type) {
            case actions.apply_task_choicePage_filters :                 
                return {
                    is_fecthed : state.is_fecthed,
                    is_loading : state.is_loading,
                    is_changed : true,
                    is_theme : !state.is_theme,
                    tasks : state.tasks,
                    current_task_by_theme_and_id : state.current_task_by_theme_and_id
                    };
            case actions.apply_task_choicePage_task :
                return {
                    is_fecthed : state.is_fecthed,
                    is_loading : state.is_loading,
                    is_changed : false,
                    is_theme : state.is_theme,
                    tasks : state.tasks,
                    current_task_by_theme_and_id : action.current_task_by_theme_and_id
                    };
            case actions.select_tasks_request_started: 
                return {
                    is_fecthed : false,
                    is_loading : true,
                    is_changed : false,
                    is_theme : state.is_theme,
                    tasks : [],
                    current_task_by_theme_and_id : state.current_task_by_theme_and_id
                }
            case actions.select_tasks_request_successed:
                return {
                    is_fecthed : true,
                    is_loading : false,
                    is_changed : false,
                    is_theme : state.is_theme,
                    tasks : action.tasks,
                    current_task_by_theme_and_id : state.current_task_by_theme_and_id
                }
            case actions.select_tasks_request_failed:
                return {
                    is_fecthed : false,
                    is_loading : false,
                    is_changed : false,
                    is_theme : false,
                    tasks : [],
                    current_task_by_theme_and_id : [null, null]}
            default: return state
        }
    },
    course_choicePage : (state = initialState, action) => {
        switch(action.type) {
            case actions.select_tasks_request_started:
                return {
                    is_fecthed : false,
                    is_loading : true,
                    courses: state.courses 
                }
            case actions.select_tasks_request_successed:
                return {
                    is_fecthed : true,
                    is_loading : false,
                    courses: action.courses 
                }
            case actions.select_tasks_request_failed:
                return {
                    is_fecthed : false,
                    is_loading : false,
                    courses: state.courses
                }
            default: return state
        }
    }
}

export default Reducers;