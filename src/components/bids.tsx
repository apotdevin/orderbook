import { FC } from 'react';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { TableRow, TableStyles } from 'src/components/table';
import { formatCurrency } from 'src/utils/format';
import { Typo } from './typo';

export const Bids: FC<{ entries: OrderEntry[]; max: number }> = ({
  entries,
  max,
}) => {
  const tableData = entries.map(b => ({
    ...b,
    depthStr: formatCurrency(b.depth),
    sizeStr: formatCurrency(b.size),
    priceStr: <Typo.bid>{formatCurrency(b.price)}</Typo.bid>,
    max,
  }));

  return (
    <TableStyles>
      <table>
        <tr>
          <td>TOTAL</td>
          <td>SIZE</td>
          <td>PRICE</td>
        </tr>
        {tableData.map(entry => (
          <TableRow
            key={entry.price}
            inverted={false}
            maxDepth={max}
            currentValue={entry.depth}
          >
            <td>{entry.depthStr}</td>
            <td>{entry.sizeStr}</td>
            <td>{entry.priceStr}</td>
          </TableRow>
        ))}
      </table>
    </TableStyles>
  );
};
