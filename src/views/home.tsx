import { FC } from 'react';
import { OrderBook } from 'src/components/orderbook';
import { ContextProvider } from 'src/context/context';

export const HomeView: FC = () => {
  return (
    <ContextProvider>
      <OrderBook />
    </ContextProvider>
  );
};
