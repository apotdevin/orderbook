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
    depthStr: formatCurrency(b.depth),
    sizeStr: formatCurrency(b.size),
    priceStr: <Typo.ask>{formatCurrency(b.price)}</Typo.ask>,
    max,
  }));

  return (
    <TableStyles>
      <table>
        <tr>
          <td>PRICE</td>
          <td>SIZE</td>
          <td>TOTAL</td>
        </tr>
        {tableData.map(entry => (
          <TableRow
            key={entry.price}
            inverted={true}
            maxDepth={max}
            currentValue={entry.depth}
          >
            <td>{entry.priceStr}</td>
            <td>{entry.sizeStr}</td>
            <td>{entry.depthStr}</td>
          </TableRow>
        ))}
      </table>
    </TableStyles>
  );
};
