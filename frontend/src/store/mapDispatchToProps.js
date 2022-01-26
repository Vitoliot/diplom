import actionCreators from './actionCreators';
import {addCourseToUser, fetchCourses, fetchTasks, fetchUserCourses} from './thunks';

function mapDispatchToProps(component) { 
    switch(component) {
        case "TaskCatalog": return function(dispatch) {
            return {
                on_apply_task_choicePage_filters: () => {
                    dispatch(actionCreators.apply_task_choicePage_filters())
                },
                on_init: () => {
                    dispatch(fetchTasks())
                },
                on_apply_task_choicePage_task: (current_task_by_theme_and_id) => {
                    dispatch(actionCreators.apply_task_choicePage_task(current_task_by_theme_and_id))
                }
            };
        };
        case "Header" : return function(dispatch) {
            return {dispatch}
        };
        case "AuthorizeRoute" : return function(dispatch) {
            return {dispatch}
        };
        case "CourseCatalog" : return (dispatch) => {
            return {
                apply_course_choicePage_sort: (course_sort) => {
                    dispatch(actionCreators.apply_course_choicePage_sort(course_sort))
                },
                break_course_choicePage_sort: () => {
                    dispatch(actionCreators.break_course_choicePage_sort())
                },
                on_init: () => {
                    dispatch(fetchCourses())
                    dispatch(fetchUserCourses())
                },
                on_update: () => {
                    dispatch(fetchCourses())
                },
                on_course_add: (course) => {
                    dispatch(addCourseToUser(course))
                }
            }
        }
        default: return "undefined";
    }
}

export default mapDispatchToProps;