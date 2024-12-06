import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Detailpage from "./components/Detailpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/detail/:id" element={<Detailpage/>}/>
    </Routes>
  );
};

export default App;
