/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useEffect, useState } from "react";
// TODO Change later
import { Player } from "../interfaces";
import "../Styles/WaitingRoom.css";

const WaitingRoom = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([] as Player[]);

  const leaveWaitingRoom = () => {
    socket.disconnect();
    navigate("/");
  };

  const getPlayerEvent = (val: string) => {
    setPlayers(JSON.parse(val));
    console.log(JSON.parse(val));
  };

  useEffect(() => {
    socket.on("c:room:getPlayers", getPlayerEvent);

    return () => {
      socket.off("c:room:getPlayers", getPlayerEvent);
    };
  }, [getPlayerEvent]);

  useEffect(() => {
    if (!socket.connected) {
      navigate("/");
    }
    socket.emit("room:getPlayers", code);
  }, []);

  return (
    <>
      <div className="code-title">
        <h1>Room Code: {code}</h1>
      </div>
      <p>
        <button onClick={leaveWaitingRoom}>Leave</button>
      </p>
      {players.map(player => (
        <h1 key={player.socketId}>{player.name}</h1>
      ))}
    </>
  );
};

export default WaitingRoom;
