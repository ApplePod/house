import { useMemo } from 'react'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { rooms3d, type Room3D } from '../../data/floorPlan'

function makeShape(floor: [number, number][]) {
  const s = new THREE.Shape()
  floor.forEach(([x, z], i) => {
    if (i === 0) s.moveTo(x, -z)
    else s.lineTo(x, -z)
  })
  s.closePath()
  return s
}

function FloorMesh({
  floor,
  color,
  opacity,
  y,
  onClick,
}: {
  floor: [number, number][]
  color: string
  opacity: number
  y: number
  onClick?: (e: ThreeEvent<MouseEvent>) => void
}) {
  const geometry = useMemo(() => new THREE.ShapeGeometry(makeShape(floor)), [floor])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, y, 0]}
      geometry={geometry}
      onClick={onClick}
    >
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.9} />
    </mesh>
  )
}

function RoomFloor({
  room,
  selected,
  onClick,
}: {
  room: Room3D
  selected: boolean
  onClick: () => void
}) {
  const opacity = selected ? 0.85 : 0.55

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group>
      <FloorMesh floor={room.floor} color={room.color} opacity={opacity} y={0.01} onClick={handleClick} />
      {room.raisedSection && (
        <>
          <FloorMesh
            floor={room.raisedSection.floor}
            color={room.color}
            opacity={selected ? 0.95 : 0.75}
            y={room.raisedSection.height + 0.01}
            onClick={handleClick}
          />
          {/* 단차 옆면 */}
          <mesh position={[6.4, room.raisedSection.height / 2, -0.55]}>
            <boxGeometry args={[2.4, room.raisedSection.height, 1.1]} />
            <meshStandardMaterial color={room.color} roughness={0.9} transparent opacity={0.4} />
          </mesh>
        </>
      )}
    </group>
  )
}

export function RoomFloors({
  selectedRoomId,
  onSelectRoom,
}: {
  selectedRoomId: string | null
  onSelectRoom: (id: string) => void
}) {
  return (
    <group>
      {rooms3d.map((room) => (
        <RoomFloor
          key={room.id}
          room={room}
          selected={selectedRoomId === room.id}
          onClick={() => onSelectRoom(room.id)}
        />
      ))}
    </group>
  )
}

export { rooms3d }
