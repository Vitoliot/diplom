import React from "react";
import { connect } from "react-redux";
import actionCreators from "../../store/actionCreators";
import thunks from "../../store/thunks";
import TaskCatalog from "./TaskCatalog";

const TaskCatalogDisplay = connect(mapStateToProps, mapDispatchToProps, mergePropsWithDispatch)(TaskCatalog);

function mapStateToProps(state) {
    return {
        task_choicePage : state.task_choicePage
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onInit: () => {
            dispatch(thunks.fetchTasks());
        },
        onChangeFilter: () => {
            dispatch(actionCreators.apply_task_choicePage_filters());
        }
    }
}

function mergePropsWithDispatch(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
    }
}

export default TaskCatalogDisplay;