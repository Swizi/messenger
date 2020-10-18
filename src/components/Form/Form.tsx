import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import "./Form.css";
import axios from "../../axios";
import {useToasts} from "react-toast-notifications";

const Form: React.FC = () => {

  const [inputVal, setInputVal] = useState<string>('');
  const {addToast} = useToasts();

  const sendMessage = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
 
    if (inputVal !== ''){
      axios.post('/messages/new', {
        login: localStorage.getItem("login"),
        text: inputVal
      })
      setInputVal('')
    } else {
      addToast("Type something", {appearance: "error", autoDismiss: true});
    }

  }


  return (
      <InputGroup className="mb-3 app__form">
        <FormControl
          placeholder="Your message"
          aria-label="Your message"
          aria-describedby="basic-addon2"
          value={inputVal}
          onChange={(e) => setInputVal(e.currentTarget.value)}
        />
        <InputGroup.Append onClick={sendMessage}>
          <Button variant="secondary">Send</Button>
        </InputGroup.Append>
      </InputGroup>
  );
}

export default Form;
