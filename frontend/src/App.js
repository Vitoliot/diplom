import React from "react";
import {Route, Switch} from 'react-router-dom';
import TaskCatalog from "./components/TaskCatalog/TaskCatalog"
import Footer from "./components/Footer/Footer";

function App () {
    console.log(Footer)
    return <section className="App">
        {/* <Switch> */}
        {/* <Route path="/taskCatalog" component={TaskCatalog} /> */}
    {/* </Switch> */}
    <TaskCatalog></TaskCatalog>
    <Footer></Footer>
    </section>
}

export default App;