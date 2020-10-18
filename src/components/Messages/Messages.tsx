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
  // Number(localStorage.getItem("timer")) ||
  useEffect(() => {
    const channel = pusher.subscribe("messenger");
    channel.bind("inserted", function (data: Object) {
      getMessages();
    });
    channel.bind("deleted", function (data: Object) {
      getMessages();
    });
  }, []);

  // useEffect(() => {
  //   console.log(messages);
  //   if (messages !== []){
  //     setTimer(120);
  //     var ex_time = 120;
  //     setInterval(function () {
  //       ex_time = ex_time - 1;
  //       setTimer(ex_time);
  //       if (timer == 0) {
  //         clearInterval();
  //       }
  //     }, 1000);
  //   }
  // }, [messages]);

  const [login, setLogin] = useState<string>(
    localStorage.getItem("login") || "Noname"
  );
  const getMessages = async () => {
    await axios.get("/messages").then((res) => {
      setMessages(res.data);
      if (res.data.length > 0){
        var DialogueTimer = 0;
        var ex_timer = 0;
        DialogueTimer = window.setInterval(function () {
          ex_timer = Math.floor(Date.parse(res.data[0].createdAt)/1000) + 80 - Math.floor(Date.now() / 1000);
          setTimer(ex_timer);
          if (ex_timer === 0){
            clearInterval(DialogueTimer);
          }
        }, 1000);
      }
    });
  };
  // const startTimer = () => {
  //   alert(timer);
  //   if (timer == 0) {
  //     setTimer(120);
  //     var ex_time = 120;
  //     setInterval(function () {
  //       ex_time = ex_time - 1;
  //       setTimer(ex_time);
  //       if (timer == 0) {
  //         clearInterval();
  //       }
  //     }, 1000);
  //   }
  // };
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
      {/* <Card className="Message_users" bg="primary">
        <Card.Body>Ok, it is good idea</Card.Body>
      </Card> */}
    </div>
  );
};

export default Messages;
