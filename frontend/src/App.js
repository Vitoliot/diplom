import React from "react";
import {Route, Switch} from 'react-router-dom';
import TaskCatalog from "./components/TaskCatalog/TaskCatalog"
import Footer from "./components/Footer/Footer";

function App () {
    return <section className="App">
    <TaskCatalog/>
    <Footer/>
    </section>
}

export default App;