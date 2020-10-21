import React, { useState } from "react";
import "./App.css";

import LoginModal from "./components/LoginModal/LoginModal";
import Form from "./components/Form/Form";
import Messages from "./components/Messages/Messages";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [chat, setChat] = useState<Boolean>(false);

  if (chat) {
    return (
      <ToastProvider>
        <div className="App">
          <Messages/>
          <Form />
        </div>
      </ToastProvider>
    );
  } else {
    return <LoginModal setChat={setChat} />;
  }
}

export default App;
