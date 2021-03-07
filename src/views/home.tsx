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

export const LoadingComponent = () => <Loading />;

// The Orderbook component uses the window dimensions to
// correctly set some stylings. By having a dynamic non
// SSR import we can avoid loading it in the server where
// there is now window available. Loading on the server
// would cause the component to not be styled correctly.
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
