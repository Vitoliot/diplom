import React, { Suspense, lazy } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import EventsView from "./components/EventsView/EventsView";

const TaskCatalog = lazy(() => import("./components/TaskCatalog/TaskCatalog"))

const CourseCatalog = lazy(() => import("./components/CourseCatalog/CourseCatalog"))

const InvalidRoute = lazy(() => import("./components/404/404"))

const AuthComponent = lazy(() => import("./components/Auth/Auth"))

function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <Suspense fallback={<section></section>}>
        <Routes>
          <Route path="/taskCatalog" element={<TaskCatalog/>} />
          <Route path="/courseCatalog" element={<CourseCatalog/>} />
          <Route path="/login" element={<AuthComponent/>} />
          <Route path="/" element={<InvalidRoute/>} />
        </Routes>
        </Suspense>
        <EventsView/>
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;
