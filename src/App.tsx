import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import songInfo from "./media/songInfo";
import useFirebaseData from "./hooks/useFirebaseData";
import { findSelectedSong } from "./helpers/findSelected";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/routes/home/Home";
import Music from "./components/routes/music/Music";
import Album from "./components/routes/music/album/Album";
import Contact from "./components/routes/contact/Contact";
import Player from "./components/player/Player";

function App() {
  const [playing, setPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(songInfo[0].songs[0].name);
  const [data] = useFirebaseData(songInfo, selectedSong);
  const [formFocused, setFormFocused] = useState(false);

  const handleSelectSong = (name: string) => {
    const song = findSelectedSong(name, data);
    if (song) setSelectedSong(song.name);
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music data={data} />} />
          <Route
            path="/music/:album"
            element={
              <Album
                data={data}
                playing={playing}
                setPlaying={setPlaying}
                selectedSong={selectedSong}
                handleSelectSong={handleSelectSong}
              />
            }
          />
          <Route
            path="/contact"
            element={<Contact setFormFocused={setFormFocused} />}
          />
        </Routes>
        <Player
          data={data}
          playing={playing}
          setPlaying={setPlaying}
          selectedSong={selectedSong}
          handleSelectSong={handleSelectSong}
          formFocused={formFocused}
        />
      </Router>
    </div>
  );
}

export default App;
