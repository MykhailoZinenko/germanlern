import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Companion } from './Companion'
import type { AnimationName, CompanionSceneProps } from './types'

const ANIMATIONS: AnimationName[] = ['idle', 'happy', 'wave', 'sleeping', 'walking']

export function CompanionScene({
  animation: controlledAnimation,
  className,
  enableControls = true,
}: CompanionSceneProps) {
  const [localAnimation, setLocalAnimation] = useState<AnimationName>('idle')
  const animation = controlledAnimation ?? localAnimation

  return (
    <div className={`relative ${className ?? 'h-screen w-screen'}`}>
      <Canvas
        camera={{ position: [0, 0.5, 3], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} color="#ffeedd" />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#fff5e6" />
        <directionalLight position={[-2, 3, -1]} intensity={0.3} color="#e6e0ff" />
        <pointLight position={[0, -1, -2]} intensity={0.5} color="#d4c0ff" />

        <Suspense fallback={null}>
          <Companion animation={animation} />
        </Suspense>

        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.5}
            maxDistance={6}
            maxPolarAngle={Math.PI * 0.65}
            target={[0, 0.3, 0]}
          />
        )}
      </Canvas>

      {!controlledAnimation && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {ANIMATIONS.map((name) => (
            <button
              key={name}
              onClick={() => setLocalAnimation(name)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                animation === name
                  ? 'bg-[#4a4540] text-white'
                  : 'bg-white/80 text-[#4a4540] hover:bg-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
