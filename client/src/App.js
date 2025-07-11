import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Chat from "./Chat";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
