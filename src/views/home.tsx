import { FC } from 'react';
import { Header } from 'src/components/header';
import { ContextProvider } from 'src/context/context';
import { Loading } from 'src/components/loading';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};
const { wsUrl } = publicRuntimeConfig || {
  wsUrl: 'ws://localhost:3000/api/ws',
};

const LoadingComponent = () => <Loading />;

const OrderBook = dynamic(() => import('../components/orderbook'), {
  loading: LoadingComponent,
  ssr: false,
});

export const HomeView: FC = () => {
  return (
    <ContextProvider>
      <Header />
      <OrderBook url={wsUrl} />
    </ContextProvider>
  );
};
