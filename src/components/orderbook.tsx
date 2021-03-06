import { FC } from 'react';
import { useContextState } from 'src/context/context';
import { useOrderbook } from 'src/hooks/useOrderbook';
import styled from 'styled-components';
import { Asks } from './asks';
import { Bids } from './bids';
import { Options } from './options';

const S = {
  title: styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 16px;

    white-space: nowrap;
  `,

  wrapper: styled.div`
    margin-top: 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  row: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export const OrderBook: FC = () => {
  const { group, limit } = useContextState();
  const { asks, bids, format } = useOrderbook();

  const [finalBids, maxBid, minBid] = format({ group, limit, entries: bids });
  const [finalAsks, minAsk, maxAsk] = format({ group, limit, entries: asks });

  if (!finalAsks?.length && !finalBids.length) {
    return <S.wrapper>Hello</S.wrapper>;
  }

  const max = Math.max(minBid.depth, maxAsk.depth);

  const spread = minAsk.price - maxBid.price;

  return (
    <S.wrapper>
      <Options spread={spread} price={maxBid.price} />
      <S.row>
        <Bids entries={finalAsks} max={max} />
        <Asks entries={finalAsks} max={max} />
      </S.row>
    </S.wrapper>
  );
};
