import { useState, useEffect, useRef } from "react"
import axios from "axios"

import Navbar from "./components/Navbar"
import Orb from "./components/Orb"
import ChatBox from "./components/ChatBox"
import ParticlesBackground from "./components/ParticlesBackground"

function App() {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const [voiceIndex, setVoiceIndex] = useState(0)

  const [theme, setTheme] = useState("cyan")

  const themes = {
    cyan: {
      primary: "text-cyan-400",
      glow: "drop-shadow-[0_0_25px_#00ffff]"
    },

    purple: {
      primary: "text-purple-400",
      glow: "drop-shadow-[0_0_25px_#a855f7]"
    },

    red: {
      primary: "text-red-400",
      glow: "drop-shadow-[0_0_25px_#ff0000]"
    },

    green: {
      primary: "text-green-400",
      glow: "drop-shadow-[0_0_25px_#00ff00]"
    }
  }

  const currentTheme = themes[theme]

  const defaultChat = [
    {
      sender: "nova",
      text: "Hello, I am NOVA. How can I assist you today?"
    }
  ]

  const [chat, setChat] = useState(() => {

    const savedChat = localStorage.getItem("nova-chat")

    return savedChat
      ? JSON.parse(savedChat)
      : defaultChat

  })

  const chatRef = useRef(null)

  useEffect(() => {

    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight
    }

  }, [chat, loading])

  useEffect(() => {

    localStorage.setItem(
      "nova-chat",
      JSON.stringify(chat)
    )

  }, [chat])

  const clearChat = () => {

    localStorage.removeItem("nova-chat")

    setChat(defaultChat)

  }

  const speakText = (text) => {

    const speech = new SpeechSynthesisUtterance(text)

    const voices = window.speechSynthesis.getVoices()

    speech.voice = voices[voiceIndex]

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
          chatHistory: [
            ...chat,
            userMessage
          ]
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

      <ParticlesBackground />

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[85vh] relative z-10">

        <Orb />

        {/* Main Title */}
        <h1 className={`mt-10 text-5xl md:text-8xl tracking-[6px] md:tracking-[12px] font-bold text-center ${currentTheme.primary} ${currentTheme.glow}`}>
          NOVA
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 text-sm md:text-xl tracking-[4px] md:tracking-[8px] text-center px-4">
          THE FUTURE OF ASSISTANCE
        </p>

        {/* Controls */}
        <div className="mb-6 mt-4 z-10">

          <div className="flex flex-wrap items-center justify-center gap-3 bg-[#081018]/70 backdrop-blur-xl border border-cyan-900 rounded-2xl px-4 py-3 shadow-[0_0_25px_#00ffff15]">

            {/* Theme Selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-black/50 border border-cyan-900 text-cyan-400 px-4 py-2 rounded-xl outline-none"
            >
              <option value="cyan">Cyberpunk</option>
              <option value="purple">Purple Neon</option>
              <option value="red">Red AI</option>
              <option value="green">Matrix Green</option>
            </select>

            {/* Voice Selector */}
            <select
              value={voiceIndex}
              onChange={(e) =>
                setVoiceIndex(Number(e.target.value))
              }
              className="bg-black/50 border border-cyan-900 text-cyan-400 px-4 py-2 rounded-xl outline-none max-w-[180px]"
            >

              {window.speechSynthesis
                .getVoices()
                .map((voice, index) => (

                  <option
                    key={index}
                    value={index}
                  >
                    {voice.name}
                  </option>

                ))}

            </select>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-cyan-900" />

            {/* Clear Chat */}
            <button
              onClick={clearChat}
              className="bg-red-500/90 hover:bg-red-600 transition px-4 py-2 rounded-xl font-semibold"
            >
              Clear Chat
            </button>

          </div>

        </div>

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