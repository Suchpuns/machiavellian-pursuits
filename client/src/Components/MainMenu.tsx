import MenuButton from "../Components/MenuButton.tsx";
import "../Styles/MainMenu.css";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();

  const genericHandleClick = () => {};

  const playHandleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/play`);
  };

  return (
    <div className="menu-container">
      <MenuButton text="Play" onClick={playHandleClick} color="yellow" />
      <MenuButton text="Rules" onClick={genericHandleClick} color="yellow" />
      <MenuButton text="Settings" onClick={genericHandleClick} color="yellow" />
    </div>
  );
}

export default MainMenu;
