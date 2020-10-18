import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

import "./Messages.css";
import axios from "../../axios";
import Pusher from "pusher-js";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  var pusher = new Pusher('4c1664cd85c20ab6e7e5', {
    cluster: 'eu'
  });

  var channel = pusher.subscribe('messenger');
  channel.bind('inserted', function(data: Object) {
    getMessages();
  });
  const [login, setLogin] = useState<string>(
    localStorage.getItem("login") || "Noname"
  );
  const getMessages = async () => {
    await axios.get("/messages").then((res) => {
      console.log(res.data);
      setMessages(res.data);
    });
  };
  useEffect(() => {
    getMessages();
  }, [login]);

  console.log(login);
  return (
    <div>
      {messages.map((message, index) => (
        <Card
          className={`Message_user ${
            login === message.login && "Message_users"
          }`}
          bg={login === message.login ? "primary" : "light"}
          key={index}
        >
          <Card.Body>
            {message.login}: {message.text}
          </Card.Body>
        </Card>
      ))}
      {/* <Card className="Message_users" bg="primary">
        <Card.Body>Ok, it is good idea</Card.Body>
      </Card> */}
    </div>
  );
};

export default Messages;
