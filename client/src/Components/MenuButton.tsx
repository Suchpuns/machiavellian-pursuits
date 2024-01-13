import "../Styles/MenuButton.css";

interface Props {
  text: String;
}

function MenuButton({ text }: Props) {
  return <button className="menu-button">{text}</button>;
}

export default MenuButton;
