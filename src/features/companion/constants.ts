import type { FurConfig } from './types'

export const BODY_FUR: FurConfig = {
  shellCount: 64,
  shellSpacing: 0.0052,
  density: 22,
  colorRoot: [0.68, 0.58, 0.80],
  colorTip: [0.92, 0.86, 0.99],
}

export const POMPOM_FUR: FurConfig = {
  shellCount: 40,
  shellSpacing: 0.004,
  density: 28,
  colorRoot: [0.68, 0.58, 0.80],
  colorTip: [0.92, 0.86, 0.99],
}

export const EYE_CUTOUTS = {
  leftCenter: [-0.1700, 0.7200, 0.4450] as [number, number, number],
  rightCenter: [0.1700, 0.7200, 0.4450] as [number, number, number],
  zeroRadius: 0.137,
  fadeRadius: 0.21,
}

export const FUR_PHYSICS = {
  gravity: [0, -1, 0] as [number, number, number],
  windStrength: 0.018,
}

export const ANIMATION_CROSSFADE_DURATION = 0.3

export const BODY_MESH_NAME = 'Body_1' as const
export const POMPOM_MESH_NAMES = ['Hand_L_1', 'Hand_R_1', 'Foot_L_1', 'Foot_R_1'] as const
