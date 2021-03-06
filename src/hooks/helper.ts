import { sortBy } from 'lodash';
import { OrderEntry } from './useOrderbook';

export const getCurrentOrders = (
  orders: OrderEntry[],
  incomingOrders: [number, number][] = [],
  isAsk = false
) => {
  const prices = incomingOrders.map(o => o[0]);

  const newOrders = orders.filter(o => {
    return !prices.includes(o.price);
  });

  incomingOrders.forEach(o => {
    const [price, size] = o;
    if (size) {
      newOrders.push({ price, size, depth: 0 });
    }
  });

  const sorted = sortBy(newOrders, 'price');
  const correctOrder = isAsk ? sorted : sorted.reverse();

  let previous = 0;

  const enriched = correctOrder.map(entry => {
    const { price, size } = entry;
    const previousValue = previous;

    const sum = previousValue + size;

    previous = sum;

    return { price, size, depth: sum };
  });

  return enriched;
};
