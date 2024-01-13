import MenuButton from "./Components/MenuButton.tsx";
import "./Styles/MainMenu.css";

function App() {
  return (
    <div className="menu-container">
      <MenuButton text="Create Room" />
      <MenuButton text="Join Room" />
      <MenuButton text="Rules" />
      <MenuButton text="Settings" />
    </div>
  );
}

export default App;
