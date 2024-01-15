import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const LandingStub = () => {
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
    <>
      <h1>Landing Stub</h1>
      <p>Username</p>
      <input onChange={e => setUsername(e.target.value)}></input>
      <p>Room code</p>
      <input onChange={e => setCode(e.target.value)}></input>
      <p>{username != "" && <button onClick={createRoom}> Create game</button>}</p>
      {username != "" && code.length == 4 && <button onClick={joinRoom}>Join game</button>}
    </>
  );
};

export default LandingStub;
