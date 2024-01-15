import MenuButton from "../Components/MenuButton.tsx";
import "../Styles/MainMenu.css";

function MainMenu() {
  return (
    <div className="menu-container">
      <MenuButton text="Create Room" />
      <MenuButton text="Join Room" />
      <MenuButton text="Rules" />
      <MenuButton text="Settings" />
    </div>
  );
}

export default MainMenu;
