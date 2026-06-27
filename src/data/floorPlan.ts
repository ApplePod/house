/** All measurements in meters (converted from mm floor plan) */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12
export const BALCONY_WIDTH = 1.1
/** 구 발코니 단차 (16cm) */
export const BALCONY_STEP = 0.16

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  floor: [number, number][]
  notes: string[]
  /** 구 발코니 구역 — 단차 있음 */
  raisedSection?: {
    floor: [number, number][]
    height: number
  }
}

export const UNIT = {
  width: 8.7,
  depth: 5.4,
  interiorWidth: 7.6,
  halfDepth: 2.7,
}

/**
 *  Z=5.4  [발코니][  주방  ][    거실    ]  ← 발코니는 주방만 연결
 *  Z=2.7  [  —   ][침실-1 │욕실][ 침실-2 ]
 *  Z=0    [침실-1][       │     ][        ]  ← 하단 발코니 → 침실-1 흡수
 *
 *         X=0    X=1.1  X=3.8 X=5.2  X=7.6
 */
export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '3㎡',
    color: '#a8d5ba',
    floor: [
      [0, 2.7],
      [BALCONY_WIDTH, 2.7],
      [BALCONY_WIDTH, 5.4],
      [0, 5.4],
    ],
    notes: ['주방 연결만', '단차 16cm', '하단은 침실-1로 확장됨'],
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
    notes: ['싱크·가스레인지', '수납장 배치', '발코니 확장 없음'],
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
    id: 'bedroom1',
    name: '침실-1',
    area: '10㎡',
    color: '#90c9b0',
    floor: [
      [1.1, 0],
      [3.8, 0],
      [3.8, 2.7],
      [1.1, 2.7],
    ],
    raisedSection: {
      floor: [
        [0, 0],
        [BALCONY_WIDTH, 0],
        [BALCONY_WIDTH, 2.7],
        [0, 2.7],
      ],
      height: BALCONY_STEP,
    },
    notes: [
      '✅ 베란다 확장 완료',
      '단차 16cm (구 발코니)',
      '붙박이장 342mm',
      '스타일러·책상 배치',
    ],
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
    id: 'bedroom2',
    name: '침실-2',
    area: '8㎡',
    color: '#b8d4a0',
    floor: [
      [5.2, 0],
      [7.6, 0],
      [7.6, 2.7],
      [5.2, 2.7],
    ],
    notes: ['천장 2.2m', '콘센트 위치', '발코니 확장 없음'],
  },
]

export const walls: [number, number, number, number][] = [
  // Exterior
  [0, 0, 8.7, 0],
  [8.7, 0, 8.7, 5.4],
  [8.7, 5.4, 0, 5.4],
  [0, 5.4, 0, 0],
  // 발코니 칸막이 (상단만 — 하단은 침실-1)
  [BALCONY_WIDTH, 2.7, BALCONY_WIDTH, 5.4],
  // Mid wall
  [1.1, 2.7, 7.6, 2.7],
  // Interior vertical (bottom)
  [3.8, 0, 3.8, 2.7],
  [5.2, 0, 5.2, 2.7],
  // Kitchen / living
  [3.8, 2.7, 3.8, 5.4],
  // 침실-1 · 구 발코니 경계 (단차벽)
  [BALCONY_WIDTH, 0, BALCONY_WIDTH, 2.7],
]

export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 7.0, z: 5.4, width: 0.9, rot: 0, label: '현관' },
  { x: 3.8, z: 1.35, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: 5.2, z: 1.35, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: 5.2, z: 0.5, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: BALCONY_WIDTH, z: 4.0, width: 1.4, rot: Math.PI / 2, label: '발코니' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 송파구 백제고분로18길 8-17',
}

export const SCENE_CENTER = { x: 4.35, z: 2.7 }

/** 구 발코니 중심 (침실-1 확장부 라벨용) */
export const BALCONY_EXT_CENTER = { x: BALCONY_WIDTH / 2, z: 1.35 }
