import {
  FaUserAstronaut,
  FaRobot
} from "react-icons/fa"

import { motion } from "framer-motion"

function Message({ msg }) {

  const isUser = msg.sender === "user"

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.3
      }}

      className={`flex items-end gap-3 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      {/* AI Avatar */}
      {!isUser && (

        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_#00ffff50]">

          <FaRobot />

        </div>

      )}

      {/* Message Bubble */}
      <div
        className={`
          max-w-[75%]
          px-5
          py-3
          rounded-2xl
          text-sm
          md:text-base
          leading-relaxed
          backdrop-blur-xl
          border
          transition-all
          duration-300
          ${
            isUser
              ? `
                bg-cyan-500/20
                border-cyan-500
                text-white
                rounded-br-sm
                shadow-[0_0_20px_#00ffff20]
              `
              : `
                bg-[#111827]/80
                border-cyan-900
                text-gray-200
                rounded-bl-sm
              `
          }
        `}
      >
        {msg.text}
      </div>

      {/* User Avatar */}
      {isUser && (

        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">

          <FaUserAstronaut />

        </div>

      )}

    </motion.div>

  )

}

export default Message