import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNote from "./components/AddNote";
import Note from "./components/Note";
import NotesList from "./components/NotesList";

function App() {
  return (
     <Router>
        <div className="page-content container note-has-grid">
          <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active">
                  Notes
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <Link to={"/add"} className="nav-link btn-primary rounded-pill d-flex align-items-center px-3 active">
                    Add Notes
                </Link>
              </li>
          </ul>
        <div className="tab-content bg-transparent">
        <Routes>
            <Route path="/" element={<NotesList/>} />
            <Route path="/notes" element={<NotesList/>} />
            <Route path="/add" element={<AddNote/>} />
            <Route path="/notes/:id" element={<Note/>} />
          </Routes>
        </div>
      </div>
     </Router>
      
  );
}

export default App;
