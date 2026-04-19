import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { furVertexShader } from './shaders/fur.vert.glsl'
import { furFragmentShader } from './shaders/fur.frag.glsl'
import type { FurConfig } from './types'
import { EYE_CUTOUTS } from './constants'

interface FurShellProps {
  baseMesh: THREE.Mesh | THREE.SkinnedMesh
  config: FurConfig
  hasEyeCutouts?: boolean
  onMaterialsCreated?: (materials: THREE.ShaderMaterial[]) => void
}

function createShellMaterial(
  index: number,
  config: FurConfig,
  isSkinned: boolean,
  hasEyeCutouts: boolean,
): THREE.ShaderMaterial {
  const defines: Record<string, string> = {}
  if (isSkinned) defines.USE_SKINNING = ''

  return new THREE.ShaderMaterial({
    vertexShader: furVertexShader,
    fragmentShader: furFragmentShader,
    uniforms: {
      si: { value: index },
      sc: { value: config.shellCount },
      sp: { value: config.shellSpacing },
      fCol: { value: new THREE.Color(...config.colorRoot) },
      tCol: { value: new THREE.Color(...config.colorTip) },
      fDens: { value: config.density },
      grav: { value: new THREE.Vector3(0, -1, 0) },
      vel: { value: new THREE.Vector3() },
      wind: { value: 0.018 },
      time: { value: 0 },
      hasCut: { value: hasEyeCutouts ? 1 : 0 },
      eL: { value: new THREE.Vector3(...EYE_CUTOUTS.leftCenter) },
      eR: { value: new THREE.Vector3(...EYE_CUTOUTS.rightCenter) },
      cZ: { value: EYE_CUTOUTS.zeroRadius },
      cF: { value: EYE_CUTOUTS.fadeRadius },
    },
    defines,
    transparent: index > 0,
    depthWrite: index === 0,
    side: index === 0 ? THREE.FrontSide : THREE.DoubleSide,
  })
}

export function FurShell({ baseMesh, config, hasEyeCutouts = false, onMaterialsCreated }: FurShellProps) {
  const isSkinned = (baseMesh as THREE.SkinnedMesh).isSkinnedMesh === true

  const { shells, materials } = useMemo(() => {
    const geometry = baseMesh.geometry
    const mats: THREE.ShaderMaterial[] = []
    const meshes: THREE.Mesh[] = []

    for (let i = 0; i < config.shellCount; i++) {
      const material = createShellMaterial(i, config, isSkinned, hasEyeCutouts)
      mats.push(material)

      let mesh: THREE.Mesh
      if (isSkinned) {
        const skinnedBase = baseMesh as THREE.SkinnedMesh
        const skinnedShell = new THREE.SkinnedMesh(geometry, material)
        skinnedShell.bind(skinnedBase.skeleton, skinnedBase.bindMatrix)
        mesh = skinnedShell
      } else {
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.copy(baseMesh.position)
        mesh.quaternion.copy(baseMesh.quaternion)
        mesh.scale.copy(baseMesh.scale)
      }

      mesh.renderOrder = i
      mesh.frustumCulled = false
      meshes.push(mesh)
    }

    return { shells: meshes, materials: mats }
  }, [baseMesh, config, isSkinned, hasEyeCutouts])

  useEffect(() => {
    if (!isSkinned && baseMesh.parent) {
      const parent = baseMesh.parent
      for (const shell of shells) {
        parent.add(shell)
      }
      return () => {
        for (const shell of shells) {
          parent.remove(shell)
        }
      }
    }
  }, [shells, baseMesh, isSkinned])

  useEffect(() => {
    if (onMaterialsCreated) onMaterialsCreated(materials)
  }, [materials, onMaterialsCreated])

  if (isSkinned) {
    return (
      <group>
        {shells.map((mesh, i) => (
          <primitive key={i} object={mesh} />
        ))}
      </group>
    )
  }

  return null
}
