function mapStateToProps(component) {
    switch(component) {
        case "TaskCatalog": {
            return function (state) {
                return {
                    tasks: state.task_choicePage.tasks,
                    is_theme: state.task_choicePage.is_theme,
                    is_loading: state.task_choicePage.is_loading,
                    is_changed: state.task_choicePage.is_changed,
                    current_task_by_theme_and_id : state.task_choicePage.current_task_by_theme_and_id,
                };
            }
        }
        case "Component_2": {
            return function(state) {
                return {
                    value_2: state.value_2
                };
            }
        }
        default: return "undefined";
    }
}

export default mapStateToProps;