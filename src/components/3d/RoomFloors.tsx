import { useMemo } from 'react'
import * as THREE from 'three'
import { rooms3d } from '../../data/floorPlan'

function RoomFloor({
  room,
  selected,
  onClick,
}: {
  room: (typeof rooms3d)[0]
  selected: boolean
  onClick: () => void
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    room.floor.forEach(([x, z], i) => {
      if (i === 0) s.moveTo(x, -z)
      else s.lineTo(x, -z)
    })
    s.closePath()
    return s
  }, [room.floor])

  const geometry = useMemo(() => new THREE.ShapeGeometry(shape), [shape])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.01, 0]}
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <meshStandardMaterial
        color={room.color}
        transparent
        opacity={selected ? 0.85 : 0.55}
        roughness={0.9}
      />
    </mesh>
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
