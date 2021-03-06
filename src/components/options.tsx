import { FC } from 'react';
import { Minus, Plus } from 'react-feather';
import { useContextDispatch, useContextState } from 'src/context/context';
import styled from 'styled-components';

const S = {
  title: styled.div`
    width: 100%;
    text-align: center;

    white-space: nowrap;
  `,

  row: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
    margin-bottom: 16px;
    font-size: 14px;
  `,

  column: styled.div`
    display: flex;
  `,

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

  text: styled.div`
    width: 70px;
  `,

  buttons: styled.div`
    display: flex;
    margin-left: 8px;
  `,
};

export const Options: FC<{ spread: number; price: number }> = ({
  spread,
  price,
}) => {
  const { limit, group, groupStep } = useContextState();
  const dispatch = useContextDispatch();

  const spreadPercent = Math.round((spread / price) * 10000) / 100;

  return (
    <>
      <S.row>
        <S.column>
          <S.text>{`Group: ${groupStep}`}</S.text>
          <S.buttons>
            <S.button
              onClick={() =>
                dispatch({ type: 'changeGroup', group: group - 1 })
              }
            >
              <Minus size={14} />
            </S.button>
            <S.button
              onClick={() =>
                dispatch({ type: 'changeGroup', group: group + 1 })
              }
            >
              <Plus size={14} />
            </S.button>
          </S.buttons>
        </S.column>
        <S.column>
          <S.text>{`Limit: ${limit}`}</S.text>
          <S.buttons>
            <S.button
              onClick={() =>
                dispatch({ type: 'changeLimit', limit: limit - 5 })
              }
            >
              <Minus size={14} />
            </S.button>
            <S.button
              onClick={() =>
                dispatch({ type: 'changeLimit', limit: limit + 5 })
              }
            >
              <Plus size={14} />
            </S.button>
          </S.buttons>
        </S.column>
      </S.row>
      <S.row>
        <S.title>{`${spread} Spread (${spreadPercent.toFixed(2)}%)`}</S.title>
      </S.row>
    </>
  );
};
