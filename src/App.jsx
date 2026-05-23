import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { FaMicrophone } from "react-icons/fa"

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
          message: currentMessage
        }
      )

      const novaReply = {
        sender: "nova",
        text: response.data.reply
      }

      setChat(prev => [...prev, novaReply])

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

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">

        <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_15px_#00ffff]">
          NOVA
        </h1>

        <ul className="flex gap-8 text-gray-300">
          <li className="hover:text-cyan-400 cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition">
            Features
          </li>

          <li className="hover:text-cyan-400 cursor-pointer transition">
            About
          </li>
        </ul>

      </nav>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center h-[85vh] relative">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

        {/* Floating Orb */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="w-40 h-40 rounded-full border-4 border-cyan-400 shadow-[0_0_60px_#00ffff]"
        ></motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 text-8xl tracking-[12px] font-bold text-cyan-400 drop-shadow-[0_0_25px_#00ffff]"
        >
          NOVA
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 text-xl tracking-[8px]">
          THE FUTURE OF ASSISTANCE
        </p>

        {/* Chat Box */}
        <div className="mt-10 w-[90%] max-w-2xl bg-[#081018]/80 backdrop-blur-xl border border-cyan-900 rounded-2xl p-6 shadow-[0_0_25px_#00ffff20]">

          <div className="text-cyan-400 mb-4 text-lg">
            NOVA Assistant
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="bg-black rounded-xl p-4 h-64 overflow-y-auto text-gray-300 space-y-4"
          >

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-cyan-400 text-black ml-auto"
                    : "bg-[#111827] text-cyan-300"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-[#111827] text-cyan-300 p-3 rounded-xl max-w-[80%] animate-pulse">
                NOVA is thinking...
              </div>
            )}

          </div>

          {/* Input */}
          <div className="flex mt-4 gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend()
                }
              }}
              placeholder="Ask NOVA anything..."
              className="flex-1 bg-black border border-cyan-900 rounded-xl px-4 py-3 outline-none text-white"
            />

            {/* Microphone Button */}
            <button
              onClick={startListening}
              className="px-5 py-3 bg-[#111827] text-cyan-400 rounded-xl hover:scale-105 hover:shadow-[0_0_20px_#00ffff] transition"
            >
              <FaMicrophone />
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_20px_#00ffff] transition"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App