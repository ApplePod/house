import { Suspense, useEffect } from 'react'
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Text, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { RoomFloors, rooms3d } from './RoomFloors'
import { Walls, BaseFloor, ExtensionLabel } from './Walls'
import { FurnitureMesh } from './FurnitureMesh'
import { UNIT, SCENE_CENTER } from '../../data/floorPlan'
import { useStore } from '../../store/useStore'

function CameraController() {
  const { camera } = useThree()
  const viewMode = useStore((s) => s.viewMode)

  useEffect(() => {
    const { x, z } = SCENE_CENTER
    if (viewMode === 'top') {
      camera.position.set(x, 14, z)
      camera.lookAt(x, 0, z)
    } else {
      camera.position.set(x, 6, z - 4.5)
      camera.lookAt(x, 0, z)
    }
  }, [viewMode, camera])

  return (
    <OrbitControls
      makeDefault
      target={[SCENE_CENTER.x, 0, SCENE_CENTER.z]}
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
        const pts = [...room.floor, ...(room.raisedSection?.floor ?? [])]
        const cx = pts.reduce((s, [x]) => s + x, 0) / pts.length
        const cz = pts.reduce((s, [, z]) => s + z, 0) / pts.length
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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[SCENE_CENTER.x, 0, SCENE_CENTER.z]} onClick={handleFloorClick}>
        <planeGeometry args={[UNIT.width + 2, UNIT.depth + 2]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <BaseFloor />
      <RoomFloors selectedRoomId={selectedRoomId} onSelectRoom={selectRoom} />
      <Walls />
      <ExtensionLabel />
      <RoomLabels />

      <Grid
        args={[UNIT.width, UNIT.depth]}
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={1}
        sectionColor="#444"
        cellColor="#333"
        fadeDistance={25}
        position={[SCENE_CENTER.x, 0.005, SCENE_CENTER.z]}
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
      camera={{ position: [SCENE_CENTER.x, 6, SCENE_CENTER.z - 4.5], fov: 55, near: 0.1, far: 100 }}
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
