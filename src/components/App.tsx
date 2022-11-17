import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import songInfo from "../media/songInfo";
import useFirebaseData from "../hooks/useFirebaseData";
import Navbar from "./navbar/Navbar";
import Home from "./routes/home/Home";
import Music from "./routes/music/Music";
import Album from "./routes/album/Album";
import Contact from "./routes/contact/Contact";
import Player from "./player/Player";

function App() {
  const [playing, setPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState(songInfo[0].songs[0].name);
  const [data] = useFirebaseData(songInfo, selectedSong);
  const [formFocused, setFormFocused] = useState(false);

  const handleFormFocus = (focus: boolean) => {
    setFormFocused(focus);
  };

  return (
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
              setSelectedSong={setSelectedSong}
            />
          }
        />
        <Route
          path="/contact"
          element={<Contact handleFormFocus={handleFormFocus} />}
        />
      </Routes>
      <Player
        data={data}
        playing={playing}
        setPlaying={setPlaying}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        formFocused={formFocused}
      />
    </Router>
  );
}

export default App;
