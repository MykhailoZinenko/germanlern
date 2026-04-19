import type * as THREE from 'three'

export type AnimationName = 'idle' | 'happy' | 'wave' | 'sleeping' | 'walking'

export interface CreatureNodes {
  Body_1: THREE.Mesh
  Belly: THREE.Mesh
  Arm_L: THREE.SkinnedMesh
  Arm_R: THREE.SkinnedMesh
  Leg_L: THREE.SkinnedMesh
  Leg_R: THREE.SkinnedMesh
  Hand_L_1: THREE.SkinnedMesh
  Hand_R_1: THREE.SkinnedMesh
  Foot_L_1: THREE.SkinnedMesh
  Foot_R_1: THREE.SkinnedMesh
  Sclera_L: THREE.Mesh
  Sclera_R: THREE.Mesh
  Eye_L_1: THREE.Mesh
  Eye_R_1: THREE.Mesh
  Highlight_L: THREE.Mesh
  Highlight_R: THREE.Mesh
  Highlight2_L: THREE.Mesh
  Highlight2_R: THREE.Mesh
}

export interface FurConfig {
  shellCount: number
  shellSpacing: number
  density: number
  colorRoot: [number, number, number]
  colorTip: [number, number, number]
}

export interface CompanionProps {
  animation?: AnimationName
  scale?: number
  position?: [number, number, number]
  onReady?: () => void
}

export interface CompanionSceneProps {
  animation?: AnimationName
  className?: string
  enableControls?: boolean
}
