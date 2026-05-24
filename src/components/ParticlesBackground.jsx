import Particles from "react-tsparticles"

function ParticlesBackground() {

  return (

    <Particles

      className="absolute inset-0 z-0"

      options={{

        background: {
          color: {
            value: "#000000"
          }
        },

        fpsLimit: 60,

        particles: {

          color: {
            value: "#00ffff"
          },

          links: {
            color: "#00ffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1
          },

          move: {
            enable: true,
            speed: 1
          },

          number: {
            value: 60
          },

          opacity: {
            value: 0.3
          },

          size: {
            value: { min: 1, max: 3 }
          }

        }

      }}

    />

  )

}

export default ParticlesBackground