import actionCreators from './actionCreators';
import {fetchTasks} from './thunks';

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
        default: return "undefined";
    }
}

export default mapDispatchToProps;