import { useEffect, useReducer } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { getCurrentOrders } from './helper';

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

export const useOrderbook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const client = new WebSocket('ws://localhost:3000/api/ws');

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: ['PI_XBTUSD'],
        })
      );
    };
    client.onmessage = ({ data }) => {
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          dispatch({ data: parsed });
        } catch (error) {
          console.warn('Unable to parse websocket data.');
        }
      } else {
        console.warn('Websocket data is not string type');
      }
    };

    client.onerror = () => {
      console.log('Connection Error');
    };

    client.onclose = () => {
      console.log('Client Closed');
    };
  }, []);

  const format = ({
    limit,
    entries,
  }: {
    group: number;
    limit: number;
    entries: OrderEntry[];
  }): [OrderEntry[], OrderEntry, OrderEntry] => {
    const sliced = entries.slice(0, limit);
    return [
      sliced,
      sliced[0] || defaultEntry,
      sliced[sliced.length - 1] || defaultEntry,
    ];
  };

  return { ...state, format };
};