/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket";
import { useEffect, useState } from "react";
// TODO Change later
import { Player } from "../interfaces";
import "../Styles/WaitingRoom.css";
import Box from "./Box";
import MenuButton from "./MenuButton";

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="menu-container">
          <Box text={`Room Code: ${code}`} type="title" />
          <div className="wait-container">
            {players.map(player => (
              <h2 key={player.socketId} className="wait-item">
                <Box text={player.name} type="icon" />
              </h2>
            ))}
          </div>
          <p>
            <MenuButton text="Leave" onClick={leaveWaitingRoom} color="red" size="small" />
          </p>
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
