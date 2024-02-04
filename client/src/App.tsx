import LandingStub from "./Components/PlayRoom";
import MainMenu from "./Components/MainMenu";
import WaitingRoom from "./Components/WaitingRoom";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<LandingStub />} />
        <Route path="/waiting/:code" element={<WaitingRoom />} />
      </Routes>
    </>
  );
}

export default App;
