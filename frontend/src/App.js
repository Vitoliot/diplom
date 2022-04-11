import React, { Suspense, lazy } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import EventsView from "./components/EventsView/EventsView";
import Profile from "./components/Profile/Profile";
import TaskChoice from "./components/TaskChoiceComponents/TaskChoice/TaskChoice";

const TaskCatalog = lazy(() => import("./components/TaskCatalog/TaskCatalog"));

const CourseCatalog = lazy(() =>
  import("./components/CourseCatalog/CourseCatalog")
);

const InvalidRoute = lazy(() => import("./components/404/404"));

const AuthComponent = lazy(() => import("./components/Auth/Auth"));

const CourseComponent = lazy(() => import("./components/Course/Course"));

const ExerciseComponent = lazy(() => import("./components/Exercise/Exercise"));

const ParamsComponent = lazy(() => import("./components/DefParams/DefParams"));

function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <Routes>
            <Route path="/courseCatalog" element={<CourseCatalog />} />
            <Route path="/login" element={<AuthComponent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercise" element={<ExerciseComponent />} />
            <Route path="/course" element={<CourseComponent />} />
            <Route path="/params" element={<ParamsComponent />} />
            <Route path="/" element={<TaskChoice />} />
            <Route path="/taskCatalog" element={<InvalidRoute />} />
          </Routes>
        </Suspense>
        <EventsView />
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;
