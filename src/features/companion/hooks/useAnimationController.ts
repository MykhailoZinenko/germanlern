import { useEffect, useRef, useCallback } from 'react'
import { useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import type { AnimationName } from '../types'
import { ANIMATION_CROSSFADE_DURATION } from '../constants'

const ONE_SHOT_ANIMATIONS: AnimationName[] = ['wave']

export function useAnimationController(
  animations: THREE.AnimationClip[],
  root: React.RefObject<THREE.Object3D | null>,
  initialAnimation: AnimationName = 'idle',
  crossfadeDuration = ANIMATION_CROSSFADE_DURATION,
) {
  const { actions, mixer } = useAnimations(animations, root)
  const currentRef = useRef<AnimationName>(initialAnimation)

  const play = useCallback(
    (name: AnimationName) => {
      const newAction = actions[name]
      if (!newAction) return

      const currentAction = actions[currentRef.current]

      const isOneShot = ONE_SHOT_ANIMATIONS.includes(name)
      newAction.setLoop(
        isOneShot ? THREE.LoopOnce : THREE.LoopRepeat,
        isOneShot ? 1 : Infinity,
      )
      newAction.clampWhenFinished = isOneShot

      newAction.reset()

      if (currentAction && currentAction !== newAction) {
        currentAction.crossFadeTo(newAction, crossfadeDuration, true)
      }

      newAction.play()
      currentRef.current = name
    },
    [actions, crossfadeDuration],
  )

  useEffect(() => {
    if (!mixer) return

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      const finishedName = Object.entries(actions).find(
        ([, action]) => action === e.action,
      )?.[0] as AnimationName | undefined

      if (finishedName && ONE_SHOT_ANIMATIONS.includes(finishedName)) {
        play('idle')
      }
    }

    mixer.addEventListener('finished', onFinished)
    return () => mixer.removeEventListener('finished', onFinished)
  }, [mixer, actions, play])

  useEffect(() => {
    play(initialAnimation)
  }, [initialAnimation, play])

  return { play, currentAnimation: currentRef.current }
}
