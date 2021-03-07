import { OrderEntry } from '../useOrderbook';

export const OrderMocks: OrderEntry[] = [
  {
    price: 1,
    size: 100,
    depth: 0,
  },
  {
    price: 2,
    size: 120,
    depth: 0,
  },
  {
    price: 10,
    size: 1000,
    depth: 0,
  },
  {
    price: 30,
    size: 7,
    depth: 0,
  },
];

export const IncomingOrderMocks: [number, number][] = [
  [1, 2],
  [30, 12],
];

export const ResultMock: OrderEntry[] = [
  {
    depth: 12,
    price: 30,
    size: 12,
  },
  {
    depth: 1012,
    price: 10,
    size: 1000,
  },
  {
    depth: 1132,
    price: 2,
    size: 120,
  },
  {
    depth: 1134,
    price: 1,
    size: 2,
  },
];

export const ResultNoIncomingMock: OrderEntry[] = [
  {
    depth: 7,
    price: 30,
    size: 7,
  },
  {
    depth: 1007,
    price: 10,
    size: 1000,
  },
  {
    depth: 1127,
    price: 2,
    size: 120,
  },
  {
    depth: 1227,
    price: 1,
    size: 100,
  },
];

export const ResultAskMock: OrderEntry[] = [
  {
    depth: 2,
    price: 1,
    size: 2,
  },
  {
    depth: 122,
    price: 2,
    size: 120,
  },
  {
    depth: 1122,
    price: 10,
    size: 1000,
  },
  {
    depth: 1134,
    price: 30,
    size: 12,
  },
];

export const IncomingOrderWithEmptyMocks: [number, number][] = [
  [1, 240],
  [2, 0],
  [10, 0],
  [30, 1200],
];

export const ResultWithEmptySizesMock: OrderEntry[] = [
  {
    depth: 240,
    price: 1,
    size: 240,
  },
  {
    depth: 1440,
    price: 30,
    size: 1200,
  },
];

export const IncomingOrderMocksForGrouping: [number, number][] = [
  [100.5, 130],
  [101, 260],
  [101.5, 120],
  [102, 250],
  [125, 120],
  [127, 123],
  [130, 332],
  [170, 2230],
  [132, 93],
  [151, 455],
  [199, 305],
  [210, 203],
  [270, 733],
  [285, 1733],
  [290, 379],
];

export const GroupedByTwoFiveMock: OrderEntry[] = [
  {
    depth: 379,
    price: 290,
    size: 379,
  },
  {
    depth: 2112,
    price: 285,
    size: 1733,
  },
  {
    depth: 2845,
    price: 270,
    size: 733,
  },
  {
    depth: 3048,
    price: 210,
    size: 203,
  },
  {
    depth: 3353,
    price: 197.5,
    size: 305,
  },
  {
    depth: 5583,
    price: 170,
    size: 2230,
  },
  {
    depth: 6038,
    price: 150,
    size: 455,
  },
  {
    depth: 6463,
    price: 130,
    size: 425,
  },
  {
    depth: 6706,
    price: 125,
    size: 243,
  },
  {
    depth: 7466,
    price: 100,
    size: 760,
  },
];

export const GroupedByFiveMock: OrderEntry[] = [
  {
    depth: 379,
    price: 290,
    size: 379,
  },
  {
    depth: 2112,
    price: 285,
    size: 1733,
  },
  {
    depth: 2845,
    price: 270,
    size: 733,
  },
  {
    depth: 3048,
    price: 210,
    size: 203,
  },
  {
    depth: 3353,
    price: 195,
    size: 305,
  },
  {
    depth: 5583,
    price: 170,
    size: 2230,
  },
  {
    depth: 6038,
    price: 150,
    size: 455,
  },
  {
    depth: 6463,
    price: 130,
    size: 425,
  },
  {
    depth: 6706,
    price: 125,
    size: 243,
  },
  {
    depth: 7466,
    price: 100,
    size: 760,
  },
];

export const GroupedByTenMock: OrderEntry[] = [
  {
    depth: 379,
    price: 290,
    size: 379,
  },
  {
    depth: 2112,
    price: 280,
    size: 1733,
  },
  {
    depth: 2845,
    price: 270,
    size: 733,
  },
  {
    depth: 3048,
    price: 210,
    size: 203,
  },
  {
    depth: 3353,
    price: 190,
    size: 305,
  },
  {
    depth: 5583,
    price: 170,
    size: 2230,
  },
  {
    depth: 6038,
    price: 150,
    size: 455,
  },
  {
    depth: 6463,
    price: 130,
    size: 425,
  },
  {
    depth: 6706,
    price: 120,
    size: 243,
  },
  {
    depth: 7466,
    price: 100,
    size: 760,
  },
];

export const GroupedByFiftyMock: OrderEntry[] = [
  {
    depth: 2845,
    price: 250,
    size: 2845,
  },
  {
    depth: 3048,
    price: 200,
    size: 203,
  },
  {
    depth: 6038,
    price: 150,
    size: 2990,
  },
  {
    depth: 7466,
    price: 100,
    size: 1428,
  },
];

export const GroupedByOneHundredMock: OrderEntry[] = [
  {
    depth: 3048,
    price: 200,
    size: 3048,
  },
  {
    depth: 7466,
    price: 100,
    size: 4418,
  },
];

export const GroupedByTwoFiveAsksMock: OrderEntry[] = [
  {
    depth: 760,
    price: 102.5,
    size: 760,
  },
  {
    depth: 880,
    price: 125,
    size: 120,
  },
  {
    depth: 1003,
    price: 127.5,
    size: 123,
  },
  {
    depth: 1335,
    price: 130,
    size: 332,
  },
  {
    depth: 1428,
    price: 132.5,
    size: 93,
  },
  {
    depth: 1883,
    price: 152.5,
    size: 455,
  },
  {
    depth: 4113,
    price: 170,
    size: 2230,
  },
  {
    depth: 4418,
    price: 200,
    size: 305,
  },
  {
    depth: 4621,
    price: 210,
    size: 203,
  },
  {
    depth: 5354,
    price: 270,
    size: 733,
  },
  {
    depth: 7087,
    price: 285,
    size: 1733,
  },
  {
    depth: 7466,
    price: 290,
    size: 379,
  },
];

export const GroupedByFiveAsksMock: OrderEntry[] = [
  {
    depth: 760,
    price: 105,
    size: 760,
  },
  {
    depth: 880,
    price: 125,
    size: 120,
  },
  {
    depth: 1335,
    price: 130,
    size: 455,
  },
  {
    depth: 1428,
    price: 135,
    size: 93,
  },
  {
    depth: 1883,
    price: 155,
    size: 455,
  },
  {
    depth: 4113,
    price: 170,
    size: 2230,
  },
  {
    depth: 4418,
    price: 200,
    size: 305,
  },
  {
    depth: 4621,
    price: 210,
    size: 203,
  },
  {
    depth: 5354,
    price: 270,
    size: 733,
  },
  {
    depth: 7087,
    price: 285,
    size: 1733,
  },
  {
    depth: 7466,
    price: 290,
    size: 379,
  },
];

export const GroupedByTenAsksMock: OrderEntry[] = [
  {
    depth: 760,
    price: 110,
    size: 760,
  },
  {
    depth: 1335,
    price: 130,
    size: 575,
  },
  {
    depth: 1428,
    price: 140,
    size: 93,
  },
  {
    depth: 1883,
    price: 160,
    size: 455,
  },
  {
    depth: 4113,
    price: 170,
    size: 2230,
  },
  {
    depth: 4418,
    price: 200,
    size: 305,
  },
  {
    depth: 4621,
    price: 210,
    size: 203,
  },
  {
    depth: 5354,
    price: 270,
    size: 733,
  },
  {
    depth: 7466,
    price: 290,
    size: 2112,
  },
];

export const GroupedByFiftyAsksMock: OrderEntry[] = [
  {
    depth: 1428,
    price: 150,
    size: 1428,
  },
  {
    depth: 4418,
    price: 200,
    size: 2990,
  },
  {
    depth: 4621,
    price: 250,
    size: 203,
  },
  {
    depth: 7466,
    price: 300,
    size: 2845,
  },
];

export const GroupedByOneHundredAsksMock: OrderEntry[] = [
  {
    depth: 4418,
    price: 200,
    size: 4418,
  },
  {
    depth: 7466,
    price: 300,
    size: 3048,
  },
];
