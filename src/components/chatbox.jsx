import { FaMicrophone } from "react-icons/fa"
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
          <Message key={index} msg={msg} />
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

  )

}

export default ChatBox