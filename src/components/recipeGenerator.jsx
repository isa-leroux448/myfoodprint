import React, { useState } from "react";
import ChatGPT from "./chatGPT";

const RecipeGenerator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform actions with the submitted values
    console.log("Submitted values:", input1, input2);
    // Reset the input fields
    setInput1("");
    setInput2("");
  };

  return (
    <div id="content" className="container">
      <ChatGPT></ChatGPT>
    </div>
  );
};

export default RecipeGenerator;
