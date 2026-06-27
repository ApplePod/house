import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import {
  WALL_HEIGHT,
  WALL_THICKNESS,
  walls,
  doors,
  UNIT,
  SCENE_CENTER,
  BALCONY_EXT_CENTER,
} from '../../data/floorPlan'

function WallSegment({ x1, z1, x2, z2 }: { x1: number; z1: number; x2: number; z2: number }) {
  const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
  const angle = Math.atan2(z2 - z1, x2 - x1)
  return (
    <mesh position={[(x1 + x2) / 2, WALL_HEIGHT / 2, (z1 + z2) / 2]} rotation={[0, -angle, 0]}>
      <boxGeometry args={[length, WALL_HEIGHT, WALL_THICKNESS]} />
      <meshStandardMaterial color="#f0ece4" roughness={0.85} />
    </mesh>
  )
}

function DoorOpening({ x, z, width, rot, label }: { x: number; z: number; width: number; rot: number; label: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[width, 2.1, 0.08]} />
        <meshStandardMaterial color="#c4a882" roughness={0.7} />
      </mesh>
      <Text position={[0, 2.25, 0.1]} fontSize={0.11} color="#666" anchorX="center">
        {label}
      </Text>
    </group>
  )
}

export function Walls() {
  return (
    <group>
      {walls.map(([x1, z1, x2, z2], i) => (
        <WallSegment key={i} x1={x1} z1={z1} x2={x2} z2={z2} />
      ))}
      {doors.map((d, i) => (
        <DoorOpening key={i} {...d} />
      ))}
    </group>
  )
}

export function BaseFloor() {
  const geometry = useMemo(() => new THREE.PlaneGeometry(UNIT.width, UNIT.depth), [UNIT.width, UNIT.depth])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[SCENE_CENTER.x, 0, SCENE_CENTER.z]} geometry={geometry}>
      <meshStandardMaterial color="#e8e2d8" roughness={0.95} />
    </mesh>
  )
}

export function ExtensionLabel() {
  return (
    <Text
      position={[BALCONY_EXT_CENTER.x, 0.22, BALCONY_EXT_CENTER.z]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.14}
      color="#5a8a70"
      anchorX="center"
    >
      베란다 흡수
    </Text>
  )
}
