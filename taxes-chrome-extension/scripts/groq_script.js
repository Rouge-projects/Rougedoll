require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "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", // Make sure the key is set in the environment
});
const app = express();
app.use(bodyParser.json());

app.post("/get-meaning", async (req, res) => {
  const word = req.body.word;

  // Set headers to allow streaming response
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    // Make the Groq API call with the selected word, enabling streaming
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `What is ${word} in simple terms?`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
      stream: true, // Enable streaming
      stop: null,
    });

    // Stream the response back to the client
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        // Send the chunk to the client
        res.write(content);
      }
    }

    // Once streaming is finished, end the response
    res.end();
  } catch (error) {
    console.error("Error fetching from Groq:", error);
    res.status(500).send("Error processing request.");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
