import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Assume you're creating an app that allows the user to 
    post status updates (ala Twitter). Your UI should have a
    textarea and a button. The button should be disabled if the
    length of the textarea is 0 or greater than 240 characters.
    The document's title should inform the user on how many
    characters they have left to type before they hit the 240
    character limit - "115 characters left."
*/

function App() {
  const [textAreaInput, setTextAreaInput] = useState("");

  React.useEffect(() => {
    document.getElementById("titlex").innerText = `${
      12 - textAreaInput.length
    } characters left`;
  }, [textAreaInput]);

  const handleTextAreaChange = (e) => {
    setTextAreaInput(e.target.value);
  };

  //let charactersLeft = 240 - textAreaInput.length

  return (
    <div className="App">
      <textarea
        rows="5"
        cols="33"
        name="area"
        onChange={handleTextAreaChange}
        value={textAreaInput}
      ></textarea>
      <div style={{ height: "10px" }} />
      <button
        disabled={textAreaInput.length === 0 || textAreaInput.length > 12}
      >
        Tweet
      </button>
      <h1 id="titlex"></h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
