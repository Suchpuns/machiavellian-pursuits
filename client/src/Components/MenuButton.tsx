import "../Styles/MenuButton.css";

interface Props {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  color: string;
  size?: string;
}

const MenuButton: React.FC<Props> = ({ text, onClick, color, size }) => {
  return (
    <button className={`menu-button ${color} ${size}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default MenuButton;
