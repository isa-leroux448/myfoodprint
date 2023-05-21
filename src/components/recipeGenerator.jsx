import React, { useState } from "react";
import Chatbot from "./Chatbot";

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
      <h2 style={{ fontSize: "40px" }}>Generate a recipe</h2>
      <p style={{ fontSize: "18px" }}>Enter 2 starting ingredients:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input1">Ingredient 1:   </label>
          <input
            type="text"
            id="input1"
            value={input1}
            onChange={(event) => setInput1(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="input2">Ingredient 2:    </label>
          <input
            type="text"
            id="input2"
            value={input2}
            onChange={(event) => setInput2(event.target.value)}
          />
        </div>
        <button style={{marginTop: '10px'}} type="submit">Submit</button>
      </form>
      <Chatbot></Chatbot>
    </div>
  );
};

export default RecipeGenerator;
