/** All measurements in meters (converted from mm floor plan) */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  /** Floor polygon corners [x, z][] */
  floor: [number, number][]
  notes: string[]
}

/** Unit footprint: 8.7m (W) × 5.4m (D) including balcony */
export const UNIT = {
  width: 8.7,
  depth: 5.4,
  interiorWidth: 7.6,
  balconyWidth: 1.1,
  halfDepth: 2.7,
}

/**
 * Floor plan layout (X→ right, Z→ up on plan / toward kitchen):
 *
 *  Z=5.4  [발코니][  주방  ][    거실    ]
 *  Z=2.7  [발코니][침실-2 ][욕실][ 침실-1 ]
 *  Z=0
 *         X=0    X=1.1  X=3.8 X=5.2  X=7.6 X=8.7
 */
export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '6㎡',
    color: '#a8d5ba',
    floor: [
      [0, 0],
      [1.1, 0],
      [1.1, 5.4],
      [0, 5.4],
    ],
    notes: ['단차 16cm', '창호·방수 확인'],
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '4㎡',
    color: '#f4c4a0',
    floor: [
      [1.1, 2.7],
      [3.8, 2.7],
      [3.8, 5.4],
      [1.1, 5.4],
    ],
    notes: ['싱크·가스레인지', '수납장 배치'],
  },
  {
    id: 'living',
    name: '거실',
    area: '10㎡',
    color: '#f5e6a3',
    floor: [
      [3.8, 2.7],
      [7.6, 2.7],
      [7.6, 5.4],
      [3.8, 5.4],
    ],
    notes: ['오픈형 거실·주방', '콘센트·조명', '에어컨 배관'],
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '6㎡',
    color: '#b8d4a0',
    floor: [
      [1.1, 0],
      [3.8, 0],
      [3.8, 2.7],
      [1.1, 2.7],
    ],
    notes: ['천장 2.2m', '콘센트 위치', '에어컨 배관'],
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '3㎡',
    color: '#a0bcd4',
    floor: [
      [3.8, 0],
      [5.2, 0],
      [5.2, 2.7],
      [3.8, 2.7],
    ],
    notes: ['타일·배수', '환기·습기'],
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '8㎡',
    color: '#90c9b0',
    floor: [
      [5.2, 0],
      [7.6, 0],
      [7.6, 2.7],
      [5.2, 2.7],
    ],
    notes: ['스타일러 배치', '붙박이장·책상'],
  },
]

/** Wall segments: [x1, z1, x2, z2] exterior and interior walls */
export const walls: [number, number, number, number][] = [
  // Exterior
  [0, 0, 8.7, 0],
  [8.7, 0, 8.7, 5.4],
  [8.7, 5.4, 0, 5.4],
  [0, 5.4, 0, 0],
  // Balcony divider
  [1.1, 0, 1.1, 5.4],
  // Horizontal mid wall (bedrooms / living)
  [1.1, 2.7, 7.6, 2.7],
  // Vertical interior walls (bottom row)
  [3.8, 0, 3.8, 2.7],
  [5.2, 0, 5.2, 2.7],
  // Kitchen / living divider (partial - open plan with opening)
  [3.8, 2.7, 3.8, 5.4],
]

/** Door openings: [x, z, width, rotation] */
export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 7.0, z: 5.4, width: 0.9, rot: 0, label: '현관' },
  { x: 3.8, z: 1.35, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: 5.2, z: 1.35, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: 5.2, z: 0.5, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: 1.1, z: 4.0, width: 1.4, rot: Math.PI / 2, label: '발코니' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 송파구 백제고분로18길 8-17',
}
