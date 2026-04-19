import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function useFurPhysics(
  rootRef: React.RefObject<THREE.Object3D | null>,
  shellMaterials: THREE.ShaderMaterial[],
) {
  const prevRotY = useRef(0)
  const velocity = useRef(new THREE.Vector3())
  const initialized = useRef(false)

  useFrame((state) => {
    if (!rootRef.current || shellMaterials.length === 0) return

    const time = state.clock.elapsedTime
    const currentRotY = rootRef.current.rotation.y

    if (!initialized.current) {
      prevRotY.current = currentRotY
      initialized.current = true
    }

    const rotDelta = currentRotY - prevRotY.current
    const targetVel = new THREE.Vector3(-rotDelta * 7, 0, 0)
    velocity.current.lerp(targetVel, 0.08)
    prevRotY.current = currentRotY

    for (const material of shellMaterials) {
      material.uniforms.time.value = time
      material.uniforms.vel.value.copy(velocity.current)
    }
  })
}
