import { FC } from 'react';
import { useContextState } from 'src/context/context';
import { useOrderbook } from 'src/hooks/useOrderbook';
import styled from 'styled-components';
import { Asks } from './asks';
import { Bids } from './bids';
import { Loading } from './loading';
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
  `,
};

const OrderBook: FC = () => {
  const { groupStep, limit } = useContextState();
  const { asks, bids, format } = useOrderbook();

  const [finalBids, maxBid, minBid] = format({
    group: groupStep,
    limit,
    entries: bids,
  });
  const [finalAsks, minAsk, maxAsk] = format({
    group: groupStep,
    limit,
    entries: asks,
    isAsk: true,
  });

  if (!finalAsks?.length && !finalBids.length) {
    return <Loading />;
  }

  const max = Math.max(minBid.depth, maxAsk.depth);

  const spread = minAsk.price - maxBid.price;

  return (
    <S.wrapper>
      <Options spread={spread} price={maxBid.price} />
      <S.row>
        <Bids entries={finalBids} max={max} />
        <Asks entries={finalAsks} max={max} />
      </S.row>
    </S.wrapper>
  );
};

export default OrderBook;
