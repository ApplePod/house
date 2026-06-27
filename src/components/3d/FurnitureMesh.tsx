import { useRef, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { getCatalogItem } from '../../data/furnitureCatalog'
import type { PlacedFurniture } from '../../store/useStore'

interface Props {
  item: PlacedFurniture
  selected: boolean
  onSelect: () => void
  onMove: (x: number, z: number) => void
}

export function FurnitureMesh({ item, selected, onSelect, onMove }: Props) {
  const catalog = getCatalogItem(item.type)
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, z: 0 })

  if (!catalog) return null

  const { width, depth, height, color } = catalog
  const isFlat = item.type === 'rug'
  const yPos = isFlat ? 0.02 : height / 2

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    onSelect()
    setDragging(true)
    dragOffset.current = { x: e.point.x - item.x, z: e.point.z - item.z }
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging) return
    e.stopPropagation()
    const nx = Math.round((e.point.x - dragOffset.current.x) * 20) / 20
    const nz = Math.round((e.point.z - dragOffset.current.z) * 20) / 20
    onMove(Math.max(0.2, Math.min(8.5, nx)), Math.max(0.2, Math.min(5.2, nz)))
  }

  const handlePointerUp = () => setDragging(false)

  return (
    <group
      position={[item.x, yPos, item.z]}
      rotation={[0, item.rotation, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.05}
          emissive={selected ? '#ff8833' : '#000000'}
          emissiveIntensity={selected ? 0.12 : 0}
        />
      </mesh>
      {selected && (
        <mesh position={[0, height / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(width, depth) * 0.55, Math.max(width, depth) * 0.62, 32]} />
          <meshBasicMaterial color="#e07a3a" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}
