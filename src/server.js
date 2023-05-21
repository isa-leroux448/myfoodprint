const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

// Setup server

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//run node server.js