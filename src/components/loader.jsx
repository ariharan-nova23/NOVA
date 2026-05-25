import { motion } from "framer-motion"

function Loader() {

  return (

    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.8
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 1
        }}

        className="flex flex-col items-center"
      >

        {/* Glowing Orb */}
        <div className="w-28 h-28 rounded-full bg-cyan-400 shadow-[0_0_80px_#00ffff] animate-pulse" />

        {/* NOVA Text */}
        <motion.h1

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.5,
            duration: 1
          }}

          className="mt-8 text-5xl font-bold tracking-[10px] text-cyan-400 drop-shadow-[0_0_20px_#00ffff]"
        >
          NOVA
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-400 tracking-[6px] text-sm">
          INITIALIZING AI SYSTEM
        </p>

      </motion.div>

    </div>

  )

}

export default Loader