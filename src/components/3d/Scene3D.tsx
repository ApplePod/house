import { Suspense, useEffect } from 'react'
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Text, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { RoomFloors } from './RoomFloors'
import { Walls, BaseFloor } from './Walls'
import { FurnitureMesh } from './FurnitureMesh'
import { rooms3d, UNIT } from '../../data/floorPlan'
import { useStore } from '../../store/useStore'

function CameraController() {
  const { camera } = useThree()
  const viewMode = useStore((s) => s.viewMode)

  useEffect(() => {
    if (viewMode === 'top') {
      camera.position.set(4.35, 14, 2.7)
      camera.lookAt(4.35, 0, 2.7)
    } else {
      camera.position.set(4.35, 6, -2)
      camera.lookAt(4.35, 0, 2.7)
    }
  }, [viewMode, camera])

  return (
    <OrbitControls
      makeDefault
      target={[4.35, 0, 2.7]}
      maxPolarAngle={viewMode === 'top' ? 0.05 : Math.PI / 2.1}
      minPolarAngle={viewMode === 'top' ? 0 : 0.3}
      minDistance={3}
      maxDistance={20}
      enablePan
    />
  )
}

function RoomLabels() {
  return (
    <>
      {rooms3d.map((room) => {
        const cx = room.floor.reduce((s, [x]) => s + x, 0) / room.floor.length
        const cz = room.floor.reduce((s, [, z]) => s + z, 0) / room.floor.length
        return (
          <Text
            key={room.id}
            position={[cx, 0.05, cz]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.22}
            color="#555"
            anchorX="center"
            anchorY="middle"
          >
            {room.name}
          </Text>
        )
      })}
    </>
  )
}

function SceneContent() {
  const {
    furniture,
    selectedId,
    selectedRoomId,
    placingType,
    selectFurniture,
    selectRoom,
    addFurniture,
    updateFurniture,
  } = useStore()

  const handleFloorClick = (e: ThreeEvent<MouseEvent>) => {
    if (placingType) {
      addFurniture(placingType, e.point.x, e.point.z)
    } else {
      selectFurniture(null)
    }
  }

  return (
    <>
      <color attach="background" args={['#1a1a22']} />
      <fog attach="fog" args={['#1a1a22', 15, 30]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 10, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-4, 6, -3]} intensity={0.35} />
      <hemisphereLight args={['#ffffff', '#444444', 0.4]} />

      <CameraController />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.35, 0, 2.7]} onClick={handleFloorClick}>
        <planeGeometry args={[UNIT.width + 2, UNIT.depth + 2]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <BaseFloor />
      <RoomFloors selectedRoomId={selectedRoomId} onSelectRoom={selectRoom} />
      <Walls />
      <RoomLabels />

      <Grid
        args={[UNIT.width, UNIT.depth]}
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={1}
        sectionColor="#444"
        cellColor="#333"
        fadeDistance={25}
        position={[4.35, 0.005, 2.7]}
        infiniteGrid={false}
      />

      {furniture.map((item) => (
        <FurnitureMesh
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          onSelect={() => selectFurniture(item.id)}
          onMove={(x, z) => updateFurniture(item.id, { x, z })}
        />
      ))}
    </>
  )
}

export function Scene3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [4.35, 6, -2], fov: 55, near: 0.1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
      }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
