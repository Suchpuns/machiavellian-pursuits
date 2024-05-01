import MenuButton from "./MenuButton.tsx";
import "../styles/mainMenu.css";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  const rulesHandleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/rules`);
  };

  const genericHandleClick = () => {};

  const playHandleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/play`);
  };

  return (
    <div className="menu-container">
      <MenuButton text="Play" onClick={playHandleClick} color="yellow" />
      <MenuButton text="Rules" onClick={rulesHandleClick} color="yellow" />
      <MenuButton text="Settings" onClick={genericHandleClick} color="yellow" />
    </div>
  );
};

export default MainMenu;
