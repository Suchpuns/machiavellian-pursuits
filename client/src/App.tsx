import PlayRoom from "./components/PlayRoom";
import MainMenu from "./components/MainMenu";
import WaitingRoom from "./components/WaitingRoom";
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
