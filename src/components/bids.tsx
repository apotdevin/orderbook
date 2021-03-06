import { FC } from 'react';
import { OrderEntry } from 'src/hooks/useOrderbook';
import { formatCurrency } from 'src/utils/format';
import { Table } from './table';
import { Typo } from './typo';

export const Bids: FC<{ bids: OrderEntry[]; max: number }> = ({
  bids,
  max,
}) => {
  const columns = [
    { Header: 'TOTAL', accessor: 'depthStr' },
    { Header: 'SIZE', accessor: 'sizeStr' },
    { Header: 'PRICE', accessor: 'priceStr' },
  ];

  const tableData = bids.map(b => ({
    ...b,
    depthStr: formatCurrency(b.depth),
    sizeStr: formatCurrency(b.size),
    priceStr: <Typo.bid>{formatCurrency(b.price)}</Typo.bid>,
    max,
  }));

  return (
    <>
      <Table tableData={tableData} tableColumns={columns} />
    </>
  );
};
