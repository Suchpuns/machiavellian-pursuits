import PlayRoom from "./Components/PlayRoom";
import MainMenu from "./Components/MainMenu";
import WaitingRoom from "./Components/WaitingRoom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/play" element={<PlayRoom />} />
      <Route path="/waiting/:code" element={<WaitingRoom />} />
    </Routes>
  );
}

export default App;
