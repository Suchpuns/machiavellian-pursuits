import "../Styles/Box.css";

interface Props {
  text: string;
  type: string;
}

const Box: React.FC<Props> = ({ text, type }) => {
  return <p className={`box ${type}`}>{text}</p>;
};

export default Box;
