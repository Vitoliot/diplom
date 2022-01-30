import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import TaskCatalog from "./components/TaskCatalog/TaskCatalog";
import CourseCatalog from "./components/CourseCatalog/CourseCatalog";
import InvalidRoute from "./components/404/404";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <Routes>
          <Route path="/taskCatalog" element={<TaskCatalog/>} />
          <Route path="/courseCatalog" element={<CourseCatalog/>} />
          {/* <Route path="/" element={<InvalidRoute/>} /> */}
        </Routes>
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;
