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

function bounds(floor: [number, number][]) {
  const xs = floor.map(([x]) => x)
  const zs = floor.map(([, z]) => z)
  return {
    cx: (Math.min(...xs) + Math.max(...xs)) / 2,
    cz: (Math.min(...zs) + Math.max(...zs)) / 2,
    w: Math.max(...xs) - Math.min(...xs),
    d: Math.max(...zs) - Math.min(...zs),
  }
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} geometry={geometry} onClick={onClick}>
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
      {room.raisedSection && (() => {
        const { cx, cz, w, d } = bounds(room.raisedSection.floor)
        const h = room.raisedSection.height
        return (
          <>
            <FloorMesh
              floor={room.raisedSection.floor}
              color={room.color}
              opacity={selected ? 0.95 : 0.75}
              y={h + 0.01}
              onClick={handleClick}
            />
            <mesh position={[cx, h / 2, cz]}>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial color={room.color} roughness={0.9} transparent opacity={0.3} />
            </mesh>
          </>
        )
      })()}
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
