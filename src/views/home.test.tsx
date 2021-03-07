import { render } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { HomeView, LoadingComponent } from './home';

const ResultAskMock: OrderEntry[] = [
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

const ResultMock: OrderEntry[] = [
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

jest.mock('../hooks/useOrderbook', () => {
  return jest.fn(() => ({
    feed: 'feed',
    product_id: 'product_id',
    asks: ResultAskMock,
    bids: ResultMock,
    format: jest.fn(() => {
      return [
        ResultMock,
        {
          depth: 12,
          price: 30,
          size: 12,
        },
        {
          depth: 1134,
          price: 1,
          size: 2,
        },
      ];
    }),
  }));
});

describe('Home', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<HomeView />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('loading component renders', () => {
    const { asFragment } = render(<LoadingComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
