import {
  FaMicrophone,
  FaPaperclip
} from "react-icons/fa"

import Message from "./Message"

function ChatBox({
  chat,
  loading,
  message,
  setMessage,
  handleSend,
  startListening,
  chatRef
}) {

  return (

    <div className="mt-10 w-[95%] max-w-3xl bg-[#081018]/70 backdrop-blur-2xl border border-cyan-900 rounded-3xl p-6 shadow-[0_0_30px_#00ffff20]">

      {/* Header */}
      <div className="text-cyan-400 mb-4 text-lg font-semibold">
        NOVA Assistant
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        className="bg-black/70 rounded-2xl p-4 h-72 overflow-y-auto text-gray-300 space-y-4 border border-cyan-900"
      >

        {chat.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}

        {loading && (
          <div className="bg-[#111827] text-cyan-300 p-3 rounded-xl max-w-[80%] animate-pulse">
            NOVA is thinking...
          </div>
        )}

      </div>

      {/* Input Area */}
      <div className="flex items-center mt-5 bg-black/70 border border-cyan-900 rounded-2xl px-3 py-2">

        {/* Upload */}
        <label className="text-cyan-400 hover:text-white transition cursor-pointer px-3">

          <FaPaperclip size={18} />

          <input
            type="file"
            className="hidden"
            onChange={(e) => {

              const file = e.target.files[0]

              if (file) {
                alert(`Selected: ${file.name}`)
              }

            }}
          />

        </label>

        {/* Input */}
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
          className="flex-1 bg-transparent outline-none text-white px-2"
        />

        {/* Mic */}
        <button
          onClick={startListening}
          className="text-cyan-400 hover:text-white transition px-3"
        >
          <FaMicrophone size={18} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          className="ml-2 px-5 py-2 bg-cyan-400 text-black rounded-xl font-semibold hover:scale-105 transition"
        >
          Send
        </button>

      </div>

    </div>

  )

}

export default ChatBox