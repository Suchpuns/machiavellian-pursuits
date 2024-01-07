import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BE_URL, { autoConnect: false });

const LandingStub = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("c:room:create", (msg: string) => {
      navigate(`/waiting/${msg}`);
    });
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
    console.log("not done yet");
  };

  const handleUsernameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <h1>Landing Stub</h1>
      <input onChange={handleUsernameField}></input>
      {username != "" && (
        <>
          <button onClick={createRoom}> Create game</button>
          <button onClick={joinRoom}>Join game</button>
        </>
      )}
    </>
  );
};

export default LandingStub;
