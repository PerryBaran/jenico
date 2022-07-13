import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import songInfo from './songInfo';

import Navbar from './containers/navbar/Navbar';
import Home from './routes/home/Home';
import Music from './routes/music/Music';
import Album from './routes/music/album/Album';
import Contact from './routes/contact/Contact';
import Player from './containers/player/Player';


function App() {
  const [data] = useState(songInfo);
  const [songIndex, setSongIndex] = useState(0);
  const [albumIndex, setAlbumIndex] = useState(0);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/music" element={<Music data={data}/>}/>
        <Route path="/music/:id" element={<Album data={data}/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Player
        data={data} 
        songIndex={songIndex} 
        setSongIndex={setSongIndex}
        albumIndex={albumIndex}
        setAlbumIndex={setAlbumIndex}/>
    </Router>
  );
}

export default App;
