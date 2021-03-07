import { groupBy, sortBy } from 'lodash';
import { OrderEntry } from './useOrderbook';

// This helper function uses the current orders in the Orderbook
// and removes or updates different entries based on the ones
// received from the websocket.
export const getCurrentOrders = (
  orders: OrderEntry[],
  incomingOrders: [number, number][] = [],
  isAsk = false
) => {
  // Get prices that will be updated
  const prices = incomingOrders.map(o => o[0]);

  // Remove all entries from the current orderbook
  // that are in the new incoming orders
  const newOrders = orders.filter(o => {
    return !prices.includes(o.price);
  });

  incomingOrders.forEach(o => {
    const [price, size] = o;
    if (size) {
      // Push updated orders that have a size into the orderbook
      newOrders.push({ price, size, depth: 0 });
    }
  });

  // Sort by price and depending if it's the ask or bid side
  const sorted = sortBy(newOrders, 'price');
  const correctOrder = isAsk ? sorted : sorted.reverse();

  let previous = 0;

  // Enriches the data with the market depth for each order
  const enriched = correctOrder.map(entry => {
    const { price, size } = entry;
    const previousValue = previous;

    const sum = previousValue + size;

    previous = sum;

    return { price, size, depth: sum };
  });

  return enriched;
};

// This helper function groups orders by price based on user input
export const groupByPrice = (
  group: number,
  entries: OrderEntry[],
  isAsk = false
) => {
  // If no grouping then return entries as they arrived
  if (group === 0.5) {
    return entries;
  }

  // Round the price for the orders depending on the grouping amount
  const normalized = entries.map(entry => ({
    ...entry,
    price: isAsk
      ? Math.ceil(entry.price / group) * group
      : Math.floor(entry.price / group) * group,
  }));

  // Group by the new normalized price
  const grouped = groupBy(normalized, 'price');

  const prices = Object.keys(grouped);

  const final: OrderEntry[] = [];

  // Reduce each group to get the total size and depth
  prices.forEach(price => {
    const entry = grouped[price];

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
