import { FC } from 'react';
import { Header } from 'src/components/header';
import { ContextProvider } from 'src/context/context';
import { Loading } from 'src/components/loading';
import dynamic from 'next/dynamic';

const LoadingComponent = () => <Loading />;

const OrderBook = dynamic(() => import('../components/orderbook'), {
  loading: LoadingComponent,
  ssr: false,
});

export const HomeView: FC = () => {
  return (
    <ContextProvider>
      <Header />
      <OrderBook />
    </ContextProvider>
  );
};
