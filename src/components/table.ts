import styled, { css } from 'styled-components';
import { Colors } from '../styles/Colors';

export const TableStyles = styled.div`
  overflow-x: auto;
  table {
    border-spacing: 0;

    thead {
      color: white;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      font-size: 14px;
      text-align: right;
      margin: 0;
      padding: 2px 0;
      width: 100px;
      height: 20px;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const TableRow = styled.tr<{
  inverted?: boolean;
  maxDepth: number;
  currentValue: number;
  left?: boolean;
}>`
  background-image: ${({ inverted, maxDepth, currentValue, left }) => {
    const percent = 100 - Math.round((currentValue / maxDepth) * 100);

    return inverted
      ? css`linear-gradient(to left, transparent ${percent}%, ${Colors.lightRed} ${percent}%);`
      : css`linear-gradient(to ${
          left ? 'left' : 'right'
        }, transparent ${percent}%, ${Colors.lightGreen} ${percent}%);`;
  }};
`;
