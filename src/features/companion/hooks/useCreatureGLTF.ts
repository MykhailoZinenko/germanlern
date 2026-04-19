import { useGLTF } from '@react-three/drei'
import type { CreatureNodes } from '../types'
import type * as THREE from 'three'

const MODEL_PATH = '/creature.glb'

export interface CreatureGLTFResult {
  nodes: CreatureNodes
  materials: Record<string, THREE.Material>
  animations: THREE.AnimationClip[]
  scene: THREE.Group
}

export function useCreatureGLTF(): CreatureGLTFResult {
  const gltf = useGLTF(MODEL_PATH)
  return {
    nodes: gltf.nodes as unknown as CreatureNodes,
    materials: gltf.materials as Record<string, THREE.Material>,
    animations: gltf.animations,
    scene: gltf.scene,
  }
}

useGLTF.preload(MODEL_PATH)
