/** All measurements in meters (converted from mm floor plan) */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12

/** 침실-1 남쪽 베란다 확장 깊이 */
export const BALCONY_EXT_DEPTH = 1.1
/** 구 베란다 단차 (16cm) */
export const BALCONY_STEP = 0.16

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  floor: [number, number][]
  notes: string[]
  /** 확장된 베란다 구역 (단차 있음) */
  raisedSection?: {
    floor: [number, number][]
    height: number
  }
}

export const UNIT = {
  width: 8.7,
  depth: 5.4 + BALCONY_EXT_DEPTH,
  interiorWidth: 7.6,
  balconyWidth: 1.1,
  halfDepth: 2.7,
}

/**
 *  Z=5.4  [발코니][  주방  ][    거실    ]
 *  Z=2.7  [발코니][침실-2 ][욕실][ 침실-1 ]
 *  Z=0    [발코니][       ][     ][ 침실-1 ]
 *  Z=-1.1 [              ][     ][ 확장부 ]  ← 베란다 확장
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
    notes: ['단차 16cm', '주방·침실-2 연결'],
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
    area: '11㎡',
    color: '#90c9b0',
    floor: [
      [5.2, 0],
      [7.6, 0],
      [7.6, 2.7],
      [5.2, 2.7],
    ],
    raisedSection: {
      floor: [
        [5.2, -BALCONY_EXT_DEPTH],
        [7.6, -BALCONY_EXT_DEPTH],
        [7.6, 0],
        [5.2, 0],
      ],
      height: BALCONY_STEP,
    },
    notes: [
      '✅ 베란다 확장 완료',
      '단차 16cm (구 발코니)',
      '스타일러 배치',
      '붙박이장 342mm',
      '책상·수납 배치',
    ],
  },
]

export const walls: [number, number, number, number][] = [
  // Exterior south — 침실-1 확장부
  [0, 0, 5.2, 0],
  [5.2, -BALCONY_EXT_DEPTH, 7.6, -BALCONY_EXT_DEPTH],
  [7.6, -BALCONY_EXT_DEPTH, 8.7, 0],
  // Exterior east
  [8.7, 0, 8.7, 5.4],
  // Exterior north
  [8.7, 5.4, 0, 5.4],
  // Exterior west
  [0, 5.4, 0, 0],
  // Balcony divider
  [1.1, 0, 1.1, 5.4],
  // Mid wall
  [1.1, 2.7, 7.6, 2.7],
  // Interior vertical
  [3.8, 0, 3.8, 2.7],
  [5.2, 0, 5.2, 2.7],
  // 침실-1 확장부 측벽
  [5.2, -BALCONY_EXT_DEPTH, 5.2, 0],
  [7.6, -BALCONY_EXT_DEPTH, 7.6, 2.7],
  // Kitchen / living
  [3.8, 2.7, 3.8, 5.4],
]

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

export const SCENE_CENTER = {
  x: 4.35,
  z: (5.4 - BALCONY_EXT_DEPTH) / 2,
}
