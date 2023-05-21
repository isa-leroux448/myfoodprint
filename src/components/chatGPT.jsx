import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState([]);
    const HTTP = "http://localhost:3003/chat";
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const recipe = `Ingredients:\n
    2 bell peppers (any color)\n
    1 cup rice\n
    2 cups water\n
    Salt to taste\n
    Olive oil\n
    Steps:\n
    Wash and rinse the bell peppers. Cut off the tops and remove the seeds. Dice the bell peppers into small pieces.\n
    Rinse the rice under cold water until the water runs clear.\n
    In a saucepan, heat a tablespoon of olive oil over medium heat.\n
    Add the diced bell peppers to the saucepan and sauté for 3-4 minutes until they start to soften.\n
    Add the rice to the saucepan and stir to combine it with the bell peppers.\n
    Pour in the water and add salt to taste. Stir well.\n
    Bring the mixture to a boil, then reduce the heat to low and cover the saucepan with a lid.\n
    Let the rice cook for about 15-20 minutes, or until all the water has been absorbed and the rice is tender.\n
    Once the rice is cooked, fluff it with a fork and let it sit for a few minutes before serving.\n
    Serve the bell pepper rice as a side dish or as a main course.`;

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = `generate a low carbon emission footprint recipes containing ${ input1 } and ${ input2 }.only include the ingredients measured in g and steps.please make sure to format the response as a string and add new lines(\n) for code after each ingredient and every step.`
        setPrompt(request);
        console.log(prompt)

        // axios
        //     .post(`${ HTTP } `, { prompt: request })
        //     .then((res) => {
        //         setResponse(res.data.split("\n"));
        //         console.log(request);
        //         console.log(response)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        setResponse(recipe.split("\n"));
        console.log(recipe);

        setInput1("");
        setInput2("");
        setPrompt("");
    };

    return (
        <div className="container" style={{display: "flex", flexDirection: "row"}}>
            <div style={{flex: 1}} id="prompt">
            <h2 style={{ fontSize: "40px" }}>Generate a recipe</h2>
            <p style={{ fontSize: "18px" }}>Enter 2 starting ingredients:</p>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="input1">Ingredient 1:    </label>
                        <input
                            id="input1"
                            className="shadow-sm"
                            type="text"
                            placeholder="Enter text"
                            value={input1}
                            onChange={(event) => setInput1(event.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="input2">Ingredient 2:    </label>
                        <input
                            id="input2"
                            className="shadow-sm"
                            type="text"
                            placeholder="Enter text"
                            value={input2}
                            onChange={(event) => setInput2(event.target.value)} />
                    </div>
                </div>
                <button style={{ marginTop: '10px' }} type="submit">Submit</button>
            </form>
            </div>
            <div style={{flex: 2}} id="recipe">
                <p>
                    {response.length > 0 ? (
                        response.map((line, index) => <p key={index}>{line}</p>)
                    ) : (
                        <p>Your recipe will appear here...</p>
                    )}
                </p>
            </div>
        </div>
    );
}

export default ChatGPT;