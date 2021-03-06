import { FC } from 'react';
import { Minus, Plus } from 'react-feather';
import { useContextDispatch, useContextState } from 'src/context/context';
import styled from 'styled-components';

const S = {
  title: styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 16px;

    white-space: nowrap;
  `,

  row: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
  `,

  column: styled.div``,

  button: styled.button`
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    :hover {
      color: black;
    }
  `,
};

export const Options: FC<{ spread: number }> = ({ spread }) => {
  const { limit } = useContextState();
  const dispatch = useContextDispatch();

  const spreadPercent = Math.round(spread * 10000) / 100;

  return (
    <S.row>
      <S.column>
        <S.title>{`${spread} Spread (${spreadPercent}%)`}</S.title>
      </S.column>
      <S.column>
        <S.button
          onClick={() => dispatch({ type: 'changeLimit', limit: limit - 10 })}
        >
          <Minus size={14} />
        </S.button>
        {limit}
        <S.button
          onClick={() => dispatch({ type: 'changeLimit', limit: limit + 10 })}
        >
          <Plus size={14} />
        </S.button>
      </S.column>
    </S.row>
  );
};
