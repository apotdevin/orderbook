import { FC } from 'react';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { formatCurrency } from 'src/utils/format';
import { Table } from './table';
import { Typo } from './typo';

export const Asks: FC<{ asks: OrderEntry[]; max: number }> = ({
  asks,
  max,
}) => {
  const columns = [
    { Header: 'PRICE', accessor: 'priceStr' },
    { Header: 'SIZE', accessor: 'sizeStr' },
    { Header: 'TOTAL', accessor: 'depthStr' },
  ];
  const tableData = asks.map(b => ({
    ...b,
    depthStr: formatCurrency(b.depth),
    sizeStr: formatCurrency(b.size),
    priceStr: <Typo.ask>{formatCurrency(b.price)}</Typo.ask>,
    max,
  }));

  return (
    <>
      <Table tableData={tableData} tableColumns={columns} inverted={true} />
    </>
  );
};
