import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './containers/Navbar';
import Home from './routes/home/Home';
import Music from './routes/music/Music';
import Album from './routes/music/album/Album';
import Contact from './routes/contact/Contact';
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
