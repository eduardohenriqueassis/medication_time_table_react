import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Table from "./Components/Table";
import "./App.css";
import CalculateTimeTable from "./Components/CalculateTimeTable";
import { GetMedicationData } from "./UserContext";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <GetMedicationData>
          <Header />
          <main className="appBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/table" element={<Table />} />
              <Route path="/calculate" element={<CalculateTimeTable />} />
            </Routes>
          </main>
          <Footer />
        </GetMedicationData>
      </BrowserRouter>
    </div>
  );
};

export default App;
