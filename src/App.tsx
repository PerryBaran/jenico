import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import songInfo from './media/songInfo';
import useFirebaseData from './hooks/useFirebaseData';

import Navbar from './components/navbar/Navbar';
import Home from './components/routes/home/Home';
import Music from './components/routes/music/Music';
import Album from './components/routes/music/album/Album';
import Contact from './components/routes/contact/Contact';
import Player from './components/player/Player';


function App() {
  const [playing, setPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [data] = useFirebaseData(songInfo, albumIndex, songIndex);
  const [formFocused, setFormFocused] = useState(false);

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/music" element={<Music data={data}/>}/>
          <Route 
            path="/music/:id" 
            element={<Album 
              data={data} 
              playing={playing} 
              setPlaying={setPlaying} 
              songIndex={songIndex} 
              setSongIndex={setSongIndex} 
              albumIndex={albumIndex}
              setAlbumIndex={setAlbumIndex}/>}/>
          <Route path="/contact" element={<Contact setFormFocused={setFormFocused}/>}/>
        </Routes>
        <Player
          data={data}
          playing={playing}
          setPlaying={setPlaying}
          songIndex={songIndex} 
          setSongIndex={setSongIndex}
          albumIndex={albumIndex}
          setAlbumIndex={setAlbumIndex}
          formFocused={formFocused}/>
      </Router>
    </div>
  );
};

export default App;
