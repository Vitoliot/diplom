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
        case "Header": {
            return function(state) {
                console.log(state)
                return {
                    isLogged: false,
                    userImgPath : state.user.userImgPath
                };
            }
        }
        case "AuthorizeRoute": {
            return function(state) {
                return {
                    // isLogged : state.user.id ? true : false
                }
            }
        }
        case "CourseCatalog" : {
            return (state) => {
                return {
                    course_choicePage : state.course_choicePage,
                    course_sort : state.course_sort
                }
            }
        }
        default: return "undefined";
    }
}

export default mapStateToProps;