import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3001");

function Chat() {
  const location = useLocation();
  const { name, room } = location.state;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const sendMessage = () => {
    if (message) {
      const data = {
        room,
        author: name,
        message,
        time: new Date().toLocaleTimeString()
      };
      socket.emit("send_message", data);
      setMessages((prev) => [...prev, data]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Room: {room}</div>
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.author === name ? "you" : "other"}`}>
            <b>{msg.author}</b>: {msg.message} <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
