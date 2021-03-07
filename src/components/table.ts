import styled from 'styled-components';
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

type TableRowProps = {
  inverted?: boolean;
  maxDepth: number;
  currentValue: number;
  left?: boolean;
};

// TableRow styled component uses the attributes feature
// as an optimization since creating CSS classes is a
// heavyweight operation. This way the styles are passed
// as inline styles to the component.
export const TableRow = styled.tr.attrs<TableRowProps>(
  ({ inverted, maxDepth, currentValue, left }) => {
    const percent = 100 - Math.round((currentValue / maxDepth) * 100);

    const linearGradient = inverted
      ? `linear-gradient(to left, transparent ${percent}%, ${Colors.lightRed} ${percent}%)`
      : `linear-gradient(to ${
          left ? 'left' : 'right'
        }, transparent ${percent}%, ${Colors.lightGreen} ${percent}%)`;

    return {
      style: { backgroundImage: linearGradient },
    };
  }
)<TableRowProps>``;
