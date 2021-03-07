import { render, cleanup } from '@testing-library/react';
import { ContextProvider } from 'src/context/context';
import { OrderEntry } from 'src/hooks/useOrderbook';
import OrderBook from '../orderbook';

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

const mockedReadyState = jest.fn();

const mockedFormatReturn = jest.fn(() => {
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
});

const mockedWindowDimensions = jest.fn(() => ({
  width: 1000,
  height: 1000,
}));

jest.mock('../../hooks/useOrderbook', () => {
  return jest.fn(() => ({
    feed: 'feed',
    product_id: 'product_id',
    asks: ResultAskMock,
    bids: ResultMock,
    readyState: mockedReadyState(),
    format: mockedFormatReturn,
  }));
});

jest.mock('../../hooks/useWindowDimensions', () => {
  return jest.fn(() => mockedWindowDimensions());
});

describe('Components', () => {
  afterEach(cleanup);
  afterAll(() => jest.unmock('../../hooks/useOrderbook'));

  describe('Orderbook', () => {
    test('matches connected no bids or asks snapshot', () => {
      mockedReadyState.mockImplementation(() => 1);
      mockedFormatReturn.mockImplementation(() => [
        [],
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
      ]);

      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test('matches mobile connected snapshot', () => {
      mockedReadyState.mockImplementation(() => 1);
      mockedFormatReturn.mockImplementation(() => [
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
      ]);

      mockedWindowDimensions.mockImplementationOnce(() => ({
        width: 400,
        height: 1000,
      }));

      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test('matches connected snapshot', () => {
      mockedReadyState.mockImplementation(() => 1);

      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test('matches connecting snapshot', () => {
      mockedReadyState.mockImplementation(() => 0);

      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test('matches disconnected snapshot', () => {
      mockedReadyState.mockImplementation(() => 2);

      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
