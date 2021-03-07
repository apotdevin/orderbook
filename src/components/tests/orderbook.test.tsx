import { render } from '@testing-library/react';
import { ContextProvider } from 'src/context/context';
import WS from 'jest-websocket-mock';
import OrderBook from '../orderbook';

new WS('ws://localhost:3000');

describe('Components', () => {
  describe('Orderbook', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(
        <ContextProvider>
          <OrderBook url={'ws://localhost:3000'} />
        </ContextProvider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
