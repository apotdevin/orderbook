import { FC } from 'react';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { TableRow, TableStyles } from 'src/components/table';
import { formatCurrency } from 'src/utils/format';
import { Typo } from './typo';

export const Bids: FC<{
  entries: OrderEntry[];
  max: number;
  isMobile: boolean;
}> = ({ entries, max, isMobile }) => {
  const tableData = entries.map(b => ({
    ...b,
    depthStr: formatCurrency(b.depth, 0),
    sizeStr: formatCurrency(b.size, 0),
    priceStr: <Typo.bid>{formatCurrency(b.price)}</Typo.bid>,
    max,
  }));

  return (
    <TableStyles>
      <table>
        <thead>
          <tr>
            <td>{isMobile ? 'PRICE' : 'TOTAL'}</td>
            <td>SIZE</td>
            <td>{isMobile ? 'TOTAL' : 'PRICE'}</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <TableRow
              key={`${entry.price}-${index}`}
              inverted={false}
              maxDepth={max}
              currentValue={entry.depth}
              left={isMobile}
            >
              <td>{isMobile ? entry.priceStr : entry.depthStr}</td>
              <td>{entry.sizeStr}</td>
              <td>{isMobile ? entry.depthStr : entry.priceStr}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </TableStyles>
  );
};
