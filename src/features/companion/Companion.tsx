import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useCreatureGLTF } from './hooks/useCreatureGLTF'
import { useAnimationController } from './hooks/useAnimationController'
import { useFurPhysics } from './hooks/useFurPhysics'
import { FurShell } from './FurShell'
import { BODY_FUR, POMPOM_FUR, BODY_MESH_NAME, POMPOM_MESH_NAMES } from './constants'
import type { CompanionProps } from './types'

export function Companion({
  animation = 'idle',
  scale = 1,
  position,
  onReady,
}: CompanionProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { nodes, animations, scene } = useCreatureGLTF()
  const [shellMaterials, setShellMaterials] = useState<THREE.ShaderMaterial[]>([])

  useAnimationController(animations, groupRef, animation)

  const bodyMesh = nodes[BODY_MESH_NAME]

  const pompomMeshes = useMemo(
    () => POMPOM_MESH_NAMES.map((name) => nodes[name]).filter(Boolean),
    [nodes],
  )

  const collectedMaterials = useRef<THREE.ShaderMaterial[]>([])
  const registerMaterials = useMemo(() => {
    return (mats: THREE.ShaderMaterial[]) => {
      collectedMaterials.current.push(...mats)
      setShellMaterials([...collectedMaterials.current])
    }
  }, [])

  useFurPhysics(groupRef, shellMaterials)

  useEffect(() => {
    if (scene && onReady) onReady()
  }, [scene, onReady])

  return (
    <group ref={groupRef} scale={scale} position={position}>
      <primitive object={scene} />

      {bodyMesh && (
        <FurShell
          baseMesh={bodyMesh}
          config={BODY_FUR}
          hasEyeCutouts
          onMaterialsCreated={registerMaterials}
        />
      )}

      {pompomMeshes.map((mesh) => (
        <FurShell
          key={mesh.name}
          baseMesh={mesh}
          config={POMPOM_FUR}
          onMaterialsCreated={registerMaterials}
        />
      ))}
    </group>
  )
}
