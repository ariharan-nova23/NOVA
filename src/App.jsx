import { useState, useEffect, useRef } from "react"
import axios from "axios"

import Navbar from "./components/Navbar"
import Orb from "./components/Orb"
import ChatBox from "./components/ChatBox"

function App() {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const [chat, setChat] = useState([
    {
      sender: "nova",
      text: "Hello, I am NOVA. How can I assist you today?"
    }
  ])

  const chatRef = useRef(null)

  useEffect(() => {

    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight
    }

  }, [chat, loading])

  const speakText = (text) => {

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang = "en-US"

    speech.rate = 1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)

  }

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript)
    }

    recognition.start()

  }

  const handleSend = async () => {

    if (message.trim() === "") return

    const userMessage = {
      sender: "user",
      text: message
    }

    setChat(prev => [...prev, userMessage])

    const currentMessage = message

    setMessage("")
    setLoading(true)

    try {

      const response = await axios.post(
        "http://localhost:5000/chat",
        {
          message: currentMessage,
          chatHistory: chat
        }
      )

      const fullText = response.data.reply

      let currentText = ""

      const novaReply = {
        sender: "nova",
        text: ""
      }

      setChat(prev => [...prev, novaReply])

      for (let i = 0; i < fullText.length; i++) {

        currentText += fullText[i]

        await new Promise(resolve =>
          setTimeout(resolve, 20)
        )

        setChat(prev => {

          const updated = [...prev]

          updated[updated.length - 1] = {
            sender: "nova",
            text: currentText
          }

          return updated

        })

      }

      speakText(fullText)

    } catch (error) {

      setChat(prev => [
        ...prev,
        {
          sender: "nova",
          text: "Connection to NOVA failed."
        }
      ])

    }

    setLoading(false)

  }

  return (

    <div className="bg-black min-h-screen text-white overflow-hidden relative">

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[85vh] relative">

        <Orb />

        {/* Main Title */}
        <h1 className="mt-10 text-8xl tracking-[12px] font-bold text-cyan-400 drop-shadow-[0_0_25px_#00ffff]">
          NOVA
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 text-xl tracking-[8px]">
          THE FUTURE OF ASSISTANCE
        </p>

        <ChatBox
          chat={chat}
          loading={loading}
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
          startListening={startListening}
          chatRef={chatRef}
        />

      </div>

    </div>

  )

}

export default App