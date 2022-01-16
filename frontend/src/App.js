import React from "react";
import {Route, Switch} from 'react-router-dom';
import TaskCatalog from "./components/TaskCatalog/TaskCatalog"

function App () {
    return <section className="App">
        {/* <Switch> */}
        {/* <Route path="/taskCatalog" component={TaskCatalog} /> */}
    {/* </Switch> */}
    <TaskCatalog></TaskCatalog>
    </section>
}

export default App;