import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"
import axios from "axios"
import multer from "multer"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage()
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

app.post(
  "/chat",
  upload.single("image"),
  async (req, res) => {

    try {

      const { message, chatHistory } = req.body

      let webData = ""

      // LIVE NEWS MODE
      if (
        message?.toLowerCase().includes("latest") ||
        message?.toLowerCase().includes("news") ||
        message?.toLowerCase().includes("current")
      ) {

        try {

          const response = await axios.get(
            "https://api.spaceflightnewsapi.net/v4/articles/"
          )

          const articles = response.data.results
            .slice(0, 5)
            .map(article =>
              `• ${article.title}`
            )
            .join("\n")

          webData =
            `Latest News:\n${articles}`

        } catch {

          webData =
            "Unable to fetch live news."

        }

      }

      // BASE MESSAGES
      const messages = [

        {
          role: "system",
          content:
            "You are NOVA, a futuristic intelligent AI assistant."
        }

      ]

      // CHAT HISTORY
      if (chatHistory) {

        const parsedHistory =
          JSON.parse(chatHistory)

        parsedHistory.forEach(msg => {

          messages.push({

            role:
              msg.sender === "user"
                ? "user"
                : "assistant",

            content: msg.text

          })

        })

      }

      // LIVE WEB DATA
      if (webData) {

        messages.push({

          role: "system",
          content: webData

        })

      }

      // IMAGE ANALYSIS
      if (req.file) {

        const base64Image =
          req.file.buffer.toString("base64")

        const imageUrl =
          `data:${req.file.mimetype};base64,${base64Image}`

        messages.push({

          role: "user",

          content: [

            {
              type: "text",
              text:
                message ||
                "Analyze this image."
            },

            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }

          ]

        })

      }

      else {

        messages.push({

          role: "user",
          content: message

        })

      }

      // GPT-4o REQUEST
      const completion =
        await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",
          messages

        })

      res.json({

        reply:
          completion.choices[0]
            .message.content

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        reply:
          "Something went wrong."

      })

    }

  }
)

const PORT = 5000

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )

})