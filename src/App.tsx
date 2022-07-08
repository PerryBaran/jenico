import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './containers/Navbar';
import Home from './routes/Home';
import Music from './routes/Music';
import Album from './routes/Album';
import Contact from './routes/Contact';
import Player from './containers/Player';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/music" element={<Music/>}/>
        <Route path="/music/:id" element={<Album/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Player/>
    </Router>
  );
}

export default App;
