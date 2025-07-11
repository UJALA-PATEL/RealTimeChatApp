import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (name && room) {
      navigate("/chat", { state: { name, room } });
    }
  };

  return (
    <div className="join-container">
      <h2>Join Chat Room</h2>
      <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Room ID" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default Join;
