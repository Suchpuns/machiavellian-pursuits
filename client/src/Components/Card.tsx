interface Props {
	name: string;
}

const Card = ({ name }: Props) => {
  return <img src={`${name}.png`} alt={name} />;
}

export default Card;
