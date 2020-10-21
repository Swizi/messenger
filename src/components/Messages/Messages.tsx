import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

import "./Messages.css";
import axios from "../../axios";
import Pusher from "pusher-js";

const pusher = new Pusher("4c1664cd85c20ab6e7e5", {
  cluster: "eu",
});

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [timer, setTimer] = useState<number>(0);
  var isIntervalCreated = false;
  useEffect(() => {
    const channel = pusher.subscribe("messenger");
    channel.bind("inserted", function (data: Object) {
      getMessages();
    });
    channel.bind("deleted", function (data: Object) {
      getMessages();
    });
  }, []);

  const [login, setLogin] = useState<string>(
    localStorage.getItem("login") || "Noname"
  );
  const getMessages = async () => {
    await axios.get("/messages").then((res) => {
      setMessages(res.data);
      if ((res.data.length > 0) && (!isIntervalCreated)) {
        axios.post("/messages/createTimer", { expireTime: 60 }).then((res) => {
          isIntervalCreated = true;
          var DialogueTimer = 0;
          var ex_timer = 0;
          DialogueTimer = window.setInterval(function () {
            axios.get("/messages/getTimer").then((res) => {
              console.log(res.data);
              ex_timer = Number(res.data);
              setTimer(ex_timer);
              if (ex_timer === 0) {
                clearInterval(DialogueTimer);
                isIntervalCreated = false;
              }
            });
          }, 1000);
        });
      }
    });
  };

  useEffect(() => {
    getMessages();
  }, [login]);

  return (
    <div>
      <h2>{timer} seconds</h2>
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
    </div>
  );
};

export default Messages;
