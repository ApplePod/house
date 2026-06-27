export interface Room {
  id: string
  name: string
  area?: string
  color: string
  notes: string[]
  /** SVG polygon points (viewBox 0 0 760 540) */
  polygon: string
}

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  floor: '2층',
  address: '서울특별시 송파구 백제고분로18길 8-17 (잠실동)',
  totalSize: '약 25㎡',
  scale: '1:100',
}

export const rooms: Room[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '2.5㎡',
    color: '#7dd3a8',
    notes: ['단차 16H', '창호·방수 확인 필요'],
    polygon: '0,0 110,0 110,540 0,540',
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '4㎡',
    color: '#f4a261',
    notes: ['싱크·가스레인지 위치', '수납장 배치 검토'],
    polygon: '110,0 380,0 380,270 110,270',
  },
  {
    id: 'living',
    name: '거실',
    area: '10㎡',
    color: '#e9c46a',
    notes: ['오픈형 거실·주방', '콘센트·조명 계획', '에어컨 배관 확인'],
    polygon: '380,0 760,0 760,270 380,270',
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '6㎡',
    color: '#90be6d',
    notes: ['220H 천장', '콘센트 위치', '에어컨까지 18개'],
    polygon: '110,270 380,270 380,540 110,540',
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '3㎡',
    color: '#577590',
    notes: ['타일·배수', '환기·습기 관리'],
    polygon: '380,270 520,270 520,540 380,540',
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '8㎡',
    color: '#43aa8b',
    notes: ['스타일러 배치 검토', '붙박이장·책상 배치'],
    polygon: '520,270 760,270 760,540 520,540',
  },
]

export const dimensions = [
  { label: '전체 가로', value: '7,600mm' },
  { label: '전체 세로', value: '5,400mm' },
  { label: '발코니', value: '1,100mm' },
  { label: '침실-2', value: '2,700mm' },
  { label: '욕실', value: '1,400mm' },
  { label: '침실-1', value: '3,500mm' },
]
