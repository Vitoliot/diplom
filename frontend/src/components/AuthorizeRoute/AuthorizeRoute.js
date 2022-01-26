import React from "react";
import {Redirect, Route} from "react-router";
import mapDispatchToProps from "../../store/mapDispatchToProps.js";
import mapStateToProps from "../../store/mapStateToProps.js";
import connect from "react-redux";

const AuthorizedRoute = (props) => {
    return (
        <div>
        {
            props.isLogged ?
            <Route path={props.path} component={props.component}/> :
            <Redirect to={{
                pathname: '/auth',
                state: { from: location }
            }} />
        }
        </div>
    );
}

export default connect(mapStateToProps("AuthorizedRoute"), mapDispatchToProps("AuthorizedRoute"))(AuthorizedRoute);