import { motion } from "framer-motion"

function Orb() {

  return (

    <>
    
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

    </>

  )

}

export default Orb