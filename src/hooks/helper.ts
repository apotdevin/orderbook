import { groupBy, sortBy } from 'lodash';
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

export const groupByPrice = (
  group: number,
  entries: OrderEntry[],
  isAsk = false
) => {
  if (group === 0.5) {
    return entries;
  }

  const normalized = entries.map(entry => ({
    ...entry,
    price: isAsk
      ? Math.ceil(entry.price / group) * group
      : Math.floor(entry.price / group) * group,
  }));

  const grouped = groupBy(normalized, 'price');

  const prices = Object.keys(grouped);

  const final: OrderEntry[] = [];

  prices.forEach(price => {
    const entry = grouped[price];
    if (!entry) return;

    const reduced = entry.reduce(
      (prev, current) => {
        return {
          ...prev,
          size: prev.size + current.size,
          depth: Math.max(prev.depth, current.depth),
        };
      },
      { price: Number(price), size: 0, depth: 0 }
    );

    final.push(reduced);
  });

  const sorted = sortBy(final, 'price');
  const correctOrder = isAsk ? sorted : sorted.reverse();

  return correctOrder;
};
