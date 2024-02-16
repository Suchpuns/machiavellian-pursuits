import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import "../Styles/TextStyles.css";
import "../Styles/InputBox.css";
import MenuButton from "./MenuButton";

const PlayRoom = () => {
  const [username, setUsername] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const joinEvent = (val: string) => {
    navigate(`/waiting/${val}`);
  };

  // Registering events
  useEffect(() => {
    socket.on("c:room:create", joinEvent);

    socket.on("c:room:join", joinEvent);

    return () => {
      socket.off("c:room:create");
      socket.off("c:room:join");
    };
  });

  const createRoom = async (e: React.MouseEvent) => {
    e.preventDefault();
    socket.auth = { username: username };
    socket.connect();
    socket.emit("room:create");
  };

  const joinRoom = async (e: React.MouseEvent) => {
    e.preventDefault();
    socket.auth = { username: username };
    socket.connect();
    socket.emit("room:join", code);
  };

  return (
    <div className="menu-container">
      <h1 className="title-text">Join or Create a Room</h1>
      <p className="paragraph-text">Username</p>
      <input
        className="input-box"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <p className="paragraph-text">Room code</p>
      <input
        className="input-box"
        onChange={(e) => setCode(e.target.value)}
      ></input>
      <p>
        {username != "" && username.length <= 10 && (
          <MenuButton
            text="Create Game"
            onClick={createRoom}
            color="yellow"
            size="small"
          />
        )}
        {username != "" && username.length <= 10 && code.length == 4 && (
          <MenuButton
            text="Join Game"
            onClick={joinRoom}
            color="green"
            size="small"
          />
        )}
      </p>
    </div>
  );
};

export default PlayRoom;
