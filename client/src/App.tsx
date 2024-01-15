import LandingStub from "./Components/LandingStub";
import WaitingRoom from "./Components/WaitingRoom";
import { Router, Routes, Route } from "react-router-dom";

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
