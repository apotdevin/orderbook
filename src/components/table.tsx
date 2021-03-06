import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { DepthBar } from './depth';

type StyledTableProps = {
  withBorder?: boolean;
  alignCenter?: boolean;
  fontSize?: string;
};

const Styles = styled.div`
  overflow-x: auto;
  table {
    border-spacing: 0;

    thead {
      color: black;
    }

    tr {
      transform: scale(1);

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      position: relative;
      top: 0;
      right: 0;

      font-size: ${({ fontSize }: StyledTableProps) => fontSize || '14px'};
      text-align: right;
      margin: 0;
      padding: 2px 0;
      width: 100px;
      height: 20px;
      ${({ withBorder }: StyledTableProps) =>
        withBorder &&
        css`
          border-bottom: 1px solid black;
        `}
      ${({ alignCenter }: StyledTableProps) =>
        alignCenter &&
        css`
          text-align: center;
          padding: 8px;
        `}
      :last-child {
        border-right: 0;
      }
    }
  }
`;

type TableProps = {
  inverted?: boolean;
  tableData: any[];
  tableColumns:
    | { Header: string; accessor: string }[]
    | { Header: string; columns: { Header: string; accessor: string }[] }[];
  withBorder?: boolean;
  fontSize?: string;
  filterPlaceholder?: string;
  notSortable?: boolean;
};

export const Table: React.FC<TableProps> = ({
  inverted,
  tableData,
  tableColumns,
  withBorder,
  fontSize,
}) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <Styles withBorder={withBorder} fontSize={fontSize}>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th key={index}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <DepthBar
                  inverted={inverted}
                  max={(row.original as { max: number }).max || 1}
                  value={(row.original as { depth: number }).depth || 0}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
