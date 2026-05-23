import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

app.post("/chat", async (req, res) => {

  try {

    const { message, chatHistory } = req.body

    const messages = [

      {
        role: "system",
        content:
          "You are NOVA, an intelligent AI assistant. Always remember previous conversation context accurately. If the user tells you their name or information, remember it and use it naturally later."
      },

      ...chatHistory
        .filter(msg => msg.text.trim() !== "")
        .map(msg => ({
          role:
            msg.sender === "user"
              ? "user"
              : "assistant",
          content: msg.text
        })),

      {
        role: "user",
        content: message
      }

    ]

    const completion = await openai.chat.completions.create({

      model: "openai/gpt-3.5-turbo",

      messages

    })

    res.json({
      reply: completion.choices[0].message.content
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      reply: "Something went wrong."
    })

  }

})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})