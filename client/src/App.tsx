import LandingStub from "./Components/LandingStub.tsx";
import WaitingRoom from "./Components/WaitingRoom.tsx";
import { Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingStub />} />
        <Route path="/waiting/:code" element={<WaitingRoom />} />
      </Routes>
    </>
  );
}

export default App;
