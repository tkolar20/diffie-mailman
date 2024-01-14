import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Home from "./Home";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
