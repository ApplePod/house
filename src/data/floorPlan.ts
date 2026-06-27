/**
 * 201호 Archisketch 실측 반영 (발코니 배치 수정)
 *
 *  Z=5.4  [발코니 3㎡][  주방  ][    거실 10㎡    ]
 *  Z=2.7  [   —     ][침실-2 6㎡][욕실][  (우측방)  ]
 *  Z=0    [침실-1 13㎡ ← 하단 발코니 흡수][ 침실-2?  ]
 *
 *  · 발코니 = 주방 옆 상단만 (1100×2700)
 *  · 하단 발코니 → 침실-1(좌하) 흡수, 단차 16cm
 *  · 주방 = 발코니 확장 없음
 */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12
export const BALCONY_STEP = 0.16

export const D = {
  balconyW: 1.1,
  colBed: 2.7,
  colBath: 1.4,
  colEast: 3.5,
  halfH: 2.7,
} as const

export const X = {
  bal: 0,
  in: D.balconyW,
  bed: D.balconyW + D.colBed,
  bath: D.balconyW + D.colBed + D.colBath,
  east: D.balconyW + D.colBed + D.colBath + D.colEast,
} as const

export const Z = { south: 0, mid: D.halfH, north: D.halfH * 2 } as const

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  floor: [number, number][]
  notes: string[]
  raisedSection?: { floor: [number, number][]; height: number }
}

export const UNIT = { width: X.east, depth: Z.north }

export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '3㎡',
    color: '#a8d5ba',
    floor: [
      [X.bal, Z.mid],
      [X.in, Z.mid],
      [X.in, Z.north],
      [X.bal, Z.north],
    ],
    notes: ['주방 연결 (상단만)', '1100×2700mm', '단차 16cm', '하단 → 침실-1 흡수'],
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '4㎡',
    color: '#f4c4a0',
    floor: [
      [X.in, Z.mid],
      [X.bed, Z.mid],
      [X.bed, Z.north],
      [X.in, Z.north],
    ],
    notes: ['4058×2538mm', '싱크·가스레인지', '발코니 확장 없음'],
  },
  {
    id: 'living',
    name: '거실',
    area: '10㎡',
    color: '#f5e6a3',
    floor: [
      [X.bed, Z.mid],
      [X.east, Z.mid],
      [X.east, Z.north],
      [X.bed, Z.north],
    ],
    notes: ['주방 오픈 10㎡', '201호 현관', '콘센트·조명'],
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '13㎡',
    color: '#90c9b0',
    floor: [
      [X.in, Z.south],
      [X.bed, Z.south],
      [X.bed, Z.mid],
      [X.in, Z.mid],
    ],
    raisedSection: {
      floor: [
        [X.bal, Z.south],
        [X.in, Z.south],
        [X.in, Z.mid],
        [X.bal, Z.mid],
      ],
      height: BALCONY_STEP,
    },
    notes: [
      '✅ 하단 발코니 확장 (13㎡)',
      '2525+1100mm 폭',
      '단차 16cm · 붙박이장 342mm',
      '스타일러 배치',
    ],
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '3㎡',
    color: '#a0bcd4',
    floor: [
      [X.bed, Z.south],
      [X.bath, Z.south],
      [X.bath, Z.mid],
      [X.bed, Z.mid],
    ],
    notes: ['1228×2486mm', '타일·배수'],
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '8㎡',
    color: '#b8d4a0',
    floor: [
      [X.bath, Z.south],
      [X.east, Z.south],
      [X.east, Z.mid],
      [X.bath, Z.mid],
    ],
    notes: ['3338×2486mm', '발코니 확장 없음'],
  },
]

export const walls: [number, number, number, number][] = [
  [X.bal, Z.south, X.east, Z.south],
  [X.east, Z.south, X.east, Z.north],
  [X.east, Z.north, X.bal, Z.north],
  [X.bal, Z.north, X.bal, Z.south],
  // 발코니 칸막이 — 상단(주방)만
  [X.in, Z.mid, X.in, Z.north],
  [X.in, Z.mid, X.east, Z.mid],
  [X.bed, Z.south, X.bed, Z.mid],
  [X.bath, Z.south, X.bath, Z.mid],
  [X.bed, Z.mid, X.bed, Z.north],
  [X.bath, Z.mid, X.bath, Z.north],
]

export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 6.5, z: Z.north, width: 0.9, rot: 0, label: '현관' },
  { x: X.bed, z: 1.35, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: X.bath, z: 1.35, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: X.bath, z: 0.5, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: X.in, z: 4.0, width: 1.4, rot: Math.PI / 2, label: '발코니' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 송파구 백제고분로18길 8-17',
}

export const SCENE_CENTER = { x: X.east / 2, z: Z.north / 2 }
export const BALCONY_EXT_CENTER = { x: X.in / 2, z: Z.mid / 2 }
