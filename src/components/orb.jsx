import { Canvas } from "@react-three/fiber"
import {
  Float,
  Sphere,
  MeshDistortMaterial
} from "@react-three/drei"

function Orb() {

  return (

    <div className="absolute inset-0 h-screen w-screen z-0">

      <Canvas camera={{ position: [0, 0, 4] }}>

        <ambientLight intensity={3} />

        <directionalLight
          position={[3, 3, 5]}
          intensity={3}
        />

        <Float
          speed={4}
          rotationIntensity={3}
          floatIntensity={3}
        >

          <Sphere args={[1.5, 128, 128]} scale={3}>

            <MeshDistortMaterial
              color="#00ffff"
              distort={0.5}
              speed={3}
              roughness={0}
            />

          </Sphere>

        </Float>

      </Canvas>

    </div>

  )

}

export default Orb