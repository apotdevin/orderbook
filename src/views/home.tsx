import { FC } from 'react';
import { Header } from 'src/components/header';
import { OrderBook } from 'src/components/orderbook';
import { ContextProvider } from 'src/context/context';

export const HomeView: FC = () => {
  return (
    <ContextProvider>
      <Header />
      <OrderBook />
    </ContextProvider>
  );
};
