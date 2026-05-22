import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
})

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: "You are NOVA, a futuristic AI assistant."
        },
        {
          role: "user",
          content: message
        }
      ]
    })

    res.json({
      reply: completion.choices[0].message.content
    })

  } catch (error) {

    console.log("ERROR:")
    console.log(error.response?.data || error)

    res.status(500).json({
      reply: "NOVA connection failed."
    })

  }

})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})