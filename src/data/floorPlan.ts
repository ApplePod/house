/**
 * 201호 Archisketch 실측 평면도 기준 (mm → m)
 *
 *  Z=5.02  [발코니][  주방  ][      거실 10㎡      ]
 *  Z=2.49  [발코니][침실-2 6㎡][욕실 3㎡][ 침실-1 13㎡]
 *  Z=0
 *  Z=-1.1  [                    ][  베란다 확장   ]
 *
 *  X: 0 — 1.1 — 3.625 — 4.853 — 8.191
 */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12
export const BALCONY_STEP = 0.16

/** Archisketch 실측 치수 (m) */
export const D = {
  balconyW: 1.1,
  bed2W: 2.525,
  bathW: 1.228,
  bed1W: 3.338,
  lowerH: 2.486,
  upperH: 2.538,
  bed1Ext: 1.1,
} as const

export const X = {
  bal: 0,
  in: D.balconyW,
  bed2: D.balconyW + D.bed2W,
  bath: D.balconyW + D.bed2W + D.bathW,
  east: D.balconyW + D.bed2W + D.bathW + D.bed1W,
} as const

export const Z = {
  ext: -D.bed1Ext,
  south: 0,
  mid: D.lowerH,
  north: D.lowerH + D.upperH,
} as const

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  floor: [number, number][]
  notes: string[]
  raisedSection?: {
    floor: [number, number][]
    height: number
  }
}

export const UNIT = {
  width: X.east,
  depth: Z.north - Z.ext,
}

export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '6㎡',
    color: '#a8d5ba',
    floor: [
      [X.bal, Z.south],
      [X.in, Z.south],
      [X.in, Z.north],
      [X.bal, Z.north],
    ],
    notes: ['폭 1100mm', '주방·침실-2 연결', '단차 16cm', '확장 없음'],
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '10㎡',
    color: '#f4c4a0',
    floor: [
      [X.in, Z.mid],
      [X.bed2, Z.mid],
      [X.bed2, Z.north],
      [X.in, Z.north],
    ],
    notes: ['2525×2538mm', '싱크·가스레인지', '거실 오픈형', '발코니 확장 없음'],
  },
  {
    id: 'living',
    name: '거실',
    area: '10㎡',
    color: '#f5e6a3',
    floor: [
      [X.bed2, Z.mid],
      [X.east, Z.mid],
      [X.east, Z.north],
      [X.bed2, Z.north],
    ],
    notes: ['주방과 오픈 10㎡', '현관 연결', '콘센트·조명'],
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '6㎡',
    color: '#b8d4a0',
    floor: [
      [X.in, Z.south],
      [X.bed2, Z.south],
      [X.bed2, Z.mid],
      [X.in, Z.mid],
    ],
    notes: ['2525×2421mm', '발코니 옆', '발코니 확장 없음'],
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '3㎡',
    color: '#a0bcd4',
    floor: [
      [X.bed2, Z.south],
      [X.bath, Z.south],
      [X.bath, Z.mid],
      [X.bed2, Z.mid],
    ],
    notes: ['1228×2486mm', '타일·배수', '환기'],
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '13㎡',
    color: '#90c9b0',
    floor: [
      [X.bath, Z.south],
      [X.east, Z.south],
      [X.east, Z.mid],
      [X.bath, Z.mid],
    ],
    raisedSection: {
      floor: [
        [X.bath, Z.ext],
        [X.east, Z.ext],
        [X.east, Z.south],
        [X.bath, Z.south],
      ],
      height: BALCONY_STEP,
    },
    notes: [
      '✅ 베란다 확장 완료 (13㎡)',
      '3338mm 폭',
      '단차 16cm',
      '스타일러·붙박이장',
    ],
  },
]

export const walls: [number, number, number, number][] = [
  // 외벽 — 남쪽 (침실-1 확장부)
  [X.bal, Z.south, X.bath, Z.south],
  [X.bath, Z.ext, X.east, Z.ext],
  [X.east, Z.ext, X.east, Z.south],
  // 외벽 — 동·북·서
  [X.east, Z.south, X.east, Z.north],
  [X.east, Z.north, X.bal, Z.north],
  [X.bal, Z.north, X.bal, Z.south],
  // 발코니 칸막이 (전체 — 주방·침실-2, 확장 없음)
  [X.in, Z.south, X.in, Z.north],
  // 층간 벽
  [X.in, Z.mid, X.east, Z.mid],
  // 침실-2 / 욕실 / 침실-1
  [X.bed2, Z.south, X.bed2, Z.mid],
  [X.bath, Z.south, X.bath, Z.mid],
  // 주방 / 거실
  [X.bed2, Z.mid, X.bed2, Z.north],
  // 침실-1 확장부 서측
  [X.bath, Z.ext, X.bath, Z.south],
]

export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 6.8, z: Z.north, width: 0.9, rot: 0, label: '현관' },
  { x: X.bed2, z: 1.2, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: X.bath, z: 1.2, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: X.bath, z: 0.5, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: X.in, z: 3.8, width: 1.4, rot: Math.PI / 2, label: '발코니' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 송파구 백제고분로18길 8-17',
}

export const SCENE_CENTER = {
  x: X.east / 2,
  z: (Z.north + Z.ext) / 2,
}

export const BALCONY_EXT_CENTER = {
  x: (X.bath + X.east) / 2,
  z: (Z.ext + Z.south) / 2,
}
