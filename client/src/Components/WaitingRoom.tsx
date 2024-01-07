import { useParams } from "react-router-dom";

const WaitingRoom = () => {
  const { code } = useParams();

  return (
    <>
      <h1>Waiting Room {code}</h1>
      <button></button>
    </>
  );
};

export default WaitingRoom;
