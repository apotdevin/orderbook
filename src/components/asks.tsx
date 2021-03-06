import { FC } from 'react';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { TableRow, TableStyles } from 'src/components/table';
import { formatCurrency } from 'src/utils/format';
import { Typo } from './typo';

export const Asks: FC<{ entries: OrderEntry[]; max: number }> = ({
  entries,
  max,
}) => {
  const tableData = entries.map(b => ({
    ...b,
    depthStr: formatCurrency(b.depth, 0),
    sizeStr: formatCurrency(b.size, 0),
    priceStr: <Typo.ask>{formatCurrency(b.price)}</Typo.ask>,
    max,
  }));

  return (
    <TableStyles>
      <table>
        <thead>
          <tr>
            <td>PRICE</td>
            <td>SIZE</td>
            <td>TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <TableRow
              key={`${entry.price}-${index}`}
              inverted={true}
              maxDepth={max}
              currentValue={entry.depth}
            >
              <td>{entry.priceStr}</td>
              <td>{entry.sizeStr}</td>
              <td>{entry.depthStr}</td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </TableStyles>
  );
};
