import { render } from '@testing-library/react';
import { OrderMocks } from 'src/hooks/mocks/orders';
import { Asks } from '../asks';
import { Bids } from '../bids';
import { Header } from '../header';
import { TableRow } from '../table';

describe('Components', () => {
  describe('Asks Table', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(
        <Asks entries={OrderMocks} max={5} isMobile={false} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test('matches mobile snapshot', () => {
      const { asFragment } = render(
        <Asks entries={OrderMocks} max={5} isMobile={true} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('Bids Table', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(
        <Bids entries={OrderMocks} max={5} isMobile={false} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test('matches mobile snapshot', () => {
      const { asFragment } = render(
        <Bids entries={OrderMocks} max={5} isMobile={true} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('Header', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(<Header />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('TableRow', () => {
    test('matches snapshot', () => {
      const { asFragment } = render(
        <table>
          <tbody>
            <TableRow
              inverted={false}
              maxDepth={10}
              currentValue={2}
              left={false}
            >
              <td>1</td>
            </TableRow>
          </tbody>
        </table>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test('matches left snapshot', () => {
      const { asFragment } = render(
        <table>
          <tbody>
            <TableRow
              inverted={false}
              maxDepth={10}
              currentValue={2}
              left={true}
            >
              <td>1</td>
            </TableRow>
          </tbody>
        </table>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test('matches inverted snapshot', () => {
      const { asFragment } = render(
        <table>
          <tbody>
            <TableRow
              inverted={true}
              maxDepth={10}
              currentValue={2}
              left={false}
            >
              <td>1</td>
            </TableRow>
          </tbody>
        </table>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    test('matches inverted left snapshot', () => {
      const { asFragment } = render(
        <table>
          <tbody>
            <TableRow
              inverted={true}
              maxDepth={10}
              currentValue={2}
              left={true}
            >
              <td>1</td>
            </TableRow>
          </tbody>
        </table>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
