import React, { useState } from "react";
import axios from "axios";
import CSVHandler from "./csvHandler";
import Foodcarbon from '../assets/foodcarbon.js';

const ChatGPT = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState([]);
    const [category, setCategory] = useState("");
    const HTTP = "http://localhost:3004/chat";
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [total, setTotal] = useState(0);
    const categories = {
        Beans: 0.000697175,
        Dairy: 0.003233967,
        Fruits: 0.000360526,
        Grains: 0.002039904,
        Herbs: 0.022660015,
        Meat: 0.007519074,
        Misc: 0.001404764,
        NutsAndSeeds: 0.001192009,
        Oils: 0.001688693,
        Processed: 0.00186071,
        RootCrops: 0.00026,
        Seafood: 0.005281368,
        Tubers: 0.000382605,
        Vegetables: 0.000533252,
    }

    const recipe = `Ingredients:\n
    2 bell peppers (any color)\n
    200g rice\n
    473g water\n
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
        let temp;
        e.preventDefault();
        const request = `generate a low carbon emission footprint recipes containing ${input1} and ${input2}.only include the ingredients measured in g and steps.please make sure to format the response as a string and add new lines(\n) for code after each ingredient and every step.`
        setPrompt(request);

        axios
            .post(`${HTTP} `, { prompt: request })
            .then((res) => {
                setResponse(res.data.split("\n")); // used to be setResponse(res.data.split("\n"));
                temp = res.data;
                console.log(request);
                console.log(response)
                console.log(temp)
                const ingredientsDict = parseIngredientsAndSteps(res.data);
                console.log(ingredientsDict)
                setTotal(calculateScore(ingredientsDict))
            })
            .catch((error) => {
                console.log(error);
            });

        // ingredientsDict = parseIngredientsAndSteps(temp);
        // setTotal(calculateScore(ingredientsDict))

        //setResponse(recipe.split("\n"));

        setInput1("");
        setInput2("");
        setPrompt("");
    };

    function calculateScore(dict) {
        const dicts = Foodcarbon;
        const commodities = dicts.map((item) => item.commodity);
        const carbonValues = dicts.map((item) => item.total);
        console.log(commodities)
        console.log(carbonValues)

        const ingredients = Object.keys(dict);
        const quantities = Object.values(dict);
        console.log(ingredients)
        console.log(quantities)

        let factor;
        let grandtotal = 0;
        console.log(grandtotal)

        for (let i = 0; i < ingredients.length; i++) {
            let rawCarbon = null;
            factor = quantities[i] / 100;

            for (let j = 0; j < commodities.length; j++) {
                console.log(ingredients[i])
                if (commodities[j].toLowerCase().includes(ingredients[i].toLowerCase())) {
                    rawCarbon = carbonValues[i];
                    break;
                }
            }

            if (rawCarbon == null) {
                console.log("nope");
                rawCarbon = 0;
                const request = `given the following ingredient: ${ingredients[i]}, classify it as one of the following categories: Beans, Dairy, Fruits, Grains, Meat, Nuts&Seeds, Oils, Processed, Seafood, Tubers or Vegetable. Simply return the category`
                axios
                    .post(`${HTTP} `, { prompt: request })
                    .then((res) => {
                        setCategory(res.data);
                        console.log(request);
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // find score from dict using response
                const cats = Object.keys(categories)
                const scores = Object.values(categories)
                for (let i = 0; i < cats.length; i++) {
                    if (cats[i].includes(category)) {
                        rawCarbon = scores[i];
                        break;
                    }
                }
            }

            grandtotal += rawCarbon * factor;
            // console.log(grandtotal)
        }

        return grandtotal;

    }

    // // Function for parsing ingredients/steps from a recipe
    function parseIngredientsAndSteps(text) {
        const ingredientsDict = {};
        console.log("text: " + text)

        // Split the text into lines
        const lines = text.split('\n');
        console.log("lines: " + lines)

        for (let line of lines) {
            if (line.startsWith("- ") && line.includes("g")) {
                line = line.replace("- ", "").trim();
                const [measurement, ingredient] = line.split(" ", 2);
                if (measurement.includes("g")) {
                    ingredientsDict[ingredient.trim()] = measurement.replace("g", "").trim();
                }
            }
        }

        return ingredientsDict;
    }

    // function to parse ingredients and quantities from a line
    function parseIngredientLine(line) {
        const match = line.match(/^([\d.]+)\s*([a-zA-Z]+)\s+([\w\s]+)$/);
        if (match) {
            const quantity = parseFloat(match[1]);
            const unit = match[2];
            const ingredient = match[3];
            return { quantity, unit, ingredient };
        }
        return null;
    }

    return (
        <div className="container" style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }} id="prompt">
                <h2 style={{ fontSize: "40px" }}>Generate a recipe</h2>
                <p style={{ fontSize: "18px" }}>Enter 2 starting ingredients:</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="input1">Ingredient 1:    </label>
                            <input
                                id="input1"
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
                                type="text"
                                placeholder="Enter text"
                                value={input2}
                                onChange={(event) => setInput2(event.target.value)} />
                        </div>
                    </div>
                    <button style={{ marginTop: '10px' }} type="submit">Submit</button>
                    {total !== 0 && (
                        <div>
                            <p><strong>{total.toFixed(8)} kG </strong>{'\n'} of Carbon Emissions generated from this recipe</p>
                            <p>That's equivalent to:</p>
                            <p><strong>{(total * 0.113).toFixed(8)} gallons</strong> of gasoline consumed</p>
                            <p><strong>{(total * 0.098).toFixed(8)} pounds</strong> of coal burned</p>
                            <p><strong>{(total * 122).toFixed(8)} smartphones</strong> charged with that energy</p>
                        </div>
                    )}

                </form>
            </div>
            <div style={{ flex: 2 }} id="recipe">
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