import { useEffect, useReducer } from 'react';
import useWebSocket from 'react-use-websocket';
import { getCurrentOrders, groupByPrice } from './helper';

export type OrderEntry = {
  price: number;
  size: number;
  depth: number;
};

type State = {
  feed: string;
  product_id: string;
  asks: OrderEntry[];
  bids: OrderEntry[];
};

type Data = {
  feed: string;
  product_id: string;
  asks: [number, number][];
  bids: [number, number][];
};

type Action = {
  data: Data;
};

const defaultEntry = { price: 0, size: 0, depth: 0 };

const initialState: State = { feed: '', product_id: '', asks: [], bids: [] };

const reducer = (state: State, action: Action) => {
  const { data } = action;

  const { asks, bids, feed, product_id } = data;

  const newAsks = getCurrentOrders(state.asks, asks, true);
  const newBids = getCurrentOrders(state.bids, bids);

  return { feed, product_id, asks: newAsks, bids: newBids };
};

const useOrderbook = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    retryOnError: true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    // Only send first message if the websocket is correctly connected.
    if (readyState !== 1) return;

    // This message is required so that the server knows
    // we want to subscribe to this data stream.
    sendJsonMessage({
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_XBTUSD'],
    });
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    // Dispatch a reducer action when a new message is received
    dispatch({ data: lastJsonMessage });
  }, [lastJsonMessage]);

  // This function groups and limits the amount of
  // orders based on the values provided by the user.
  const format = ({
    group,
    limit,
    entries,
    isAsk = false,
  }: {
    group: number;
    limit: number;
    entries: OrderEntry[];
    isAsk?: boolean;
  }): [OrderEntry[], OrderEntry, OrderEntry] => {
    if (!entries.length) {
      return [[], defaultEntry, defaultEntry];
    }
    const grouped = groupByPrice(group, entries, isAsk);
    const sliced = grouped.slice(0, limit);
    return [sliced, sliced[0], sliced[sliced.length - 1]];
  };

  return { ...state, format, readyState };
};

export default useOrderbook;
