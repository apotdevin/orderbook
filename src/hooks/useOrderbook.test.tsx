import { renderHook } from '@testing-library/react-hooks';
import useOrderbook from './useOrderbook';

const mockedReadyState = jest.fn();
const mockLastMessage = jest.fn();

jest.mock('react-use-websocket', () => {
  return jest.fn(() => ({
    sendJsonMessage: jest.fn(),
    readyState: mockedReadyState(),
    lastJsonMessage: mockLastMessage(),
  }));
});

describe('useOrderbook', () => {
  test('correctly returns none ready state', () => {
    mockedReadyState.mockImplementation(() => 0);
    mockLastMessage.mockImplementationOnce(() => ({
      asks: [
        [1, 2],
        [2, 23],
      ],
      bids: [
        [3, 10],
        [4, 40],
      ],
      feed: 'feed',
      product_id: 'product_id',
    }));

    const { result } = renderHook(() => useOrderbook('ws://localhost:1234'));

    expect(result.current.asks).toEqual([
      { depth: 2, price: 1, size: 2 },
      { depth: 25, price: 2, size: 23 },
    ]);
  });
  test('correctly returns asks', () => {
    mockedReadyState.mockImplementation(() => 1);
    mockLastMessage.mockImplementationOnce(() => ({
      asks: [
        [1, 2],
        [2, 23],
      ],
      bids: [
        [3, 10],
        [4, 40],
      ],
      feed: 'feed',
      product_id: 'product_id',
    }));

    const { result } = renderHook(() => useOrderbook('ws://localhost:1234'));

    expect(result.current.asks).toEqual([
      { depth: 2, price: 1, size: 2 },
      { depth: 25, price: 2, size: 23 },
    ]);
  });

  test('correctly returns format function', () => {
    mockedReadyState.mockImplementation(() => 1);
    mockLastMessage.mockImplementationOnce(() => ({
      asks: [
        [1, 2],
        [2, 23],
      ],
      bids: [
        [3, 10],
        [4, 40],
      ],
      feed: 'feed',
      product_id: 'product_id',
    }));

    const { result } = renderHook(() => useOrderbook('ws://localhost:1234'));

    const formatted = result.current.format({
      group: 0.5,
      limit: 10,
      entries: result.current.asks,
      isAsk: false,
    });

    expect(formatted).toEqual([
      [
        {
          depth: 2,
          price: 1,
          size: 2,
        },
        {
          depth: 25,
          price: 2,
          size: 23,
        },
      ],
      {
        depth: 2,
        price: 1,
        size: 2,
      },
      {
        depth: 25,
        price: 2,
        size: 23,
      },
    ]);
  });

  test('correctly returns format function for asks', () => {
    mockedReadyState.mockImplementation(() => 1);
    mockLastMessage.mockImplementationOnce(() => ({
      asks: [
        [1, 2],
        [2, 23],
      ],
      bids: [
        [3, 10],
        [4, 40],
      ],
      feed: 'feed',
      product_id: 'product_id',
    }));

    const { result } = renderHook(() => useOrderbook('ws://localhost:1234'));

    const formatted = result.current.format({
      group: 0.5,
      limit: 10,
      entries: result.current.asks,
    });

    expect(formatted).toEqual([
      [
        {
          depth: 2,
          price: 1,
          size: 2,
        },
        {
          depth: 25,
          price: 2,
          size: 23,
        },
      ],
      {
        depth: 2,
        price: 1,
        size: 2,
      },
      {
        depth: 25,
        price: 2,
        size: 23,
      },
    ]);
  });

  test('correctly returns format function for no entries', () => {
    mockedReadyState.mockImplementation(() => 1);
    mockLastMessage.mockImplementationOnce(() => ({
      asks: [
        [1, 2],
        [2, 23],
      ],
      bids: [
        [3, 10],
        [4, 40],
      ],
      feed: 'feed',
      product_id: 'product_id',
    }));

    const { result } = renderHook(() => useOrderbook('ws://localhost:1234'));

    const formatted = result.current.format({
      group: 0.5,
      limit: 10,
      entries: [],
    });

    expect(formatted).toEqual([
      [],
      {
        depth: 0,
        price: 0,
        size: 0,
      },
      {
        depth: 0,
        price: 0,
        size: 0,
      },
    ]);
  });
});
