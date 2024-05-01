import PlayRoom from "./Components/PlayRoom";
import MainMenu from "./Components/MainMenu";
import WaitingRoom from "./Components/WaitingRoom";
import Rules from "./Components/Rules";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<PlayRoom />} />
        <Route path="/waiting/:code" element={<WaitingRoom />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </>
  );
}

export default App;
