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

export const useOrderbook = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    retryOnError: true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (readyState !== 1) return;
    sendMessage(
      JSON.stringify({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD'],
      })
    );
  }, [readyState, sendMessage]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    dispatch({ data: lastJsonMessage });
  }, [lastJsonMessage]);

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
    const grouped = groupByPrice(group, entries, isAsk);
    const sliced = grouped.slice(0, limit);
    return [
      sliced,
      sliced[0] || defaultEntry,
      sliced[sliced.length - 1] || defaultEntry,
    ];
  };

  return { ...state, format, readyState };
};
