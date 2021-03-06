import { FC, useState } from 'react';
import { Asks } from 'src/components/asks';
import { Bids } from 'src/components/bids';
import { useOrderbook } from 'src/hooks/useOrderbook';
import styled from 'styled-components';

const S = {
  title: styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
  `,

  wrapper: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  `,
};

export const HomeView: FC = () => {
  const [group] = useState<number>(0.5);
  const [limit] = useState<number>(20);

  const { feed, product_id, asks, bids, format } = useOrderbook();

  const [finalBids, maxBid, minBid] = format({ group, limit, entries: bids });
  const [finalAsks, minAsk, maxAsk] = format({ group, limit, entries: asks });

  if (!finalAsks?.length && !finalBids.length) {
    return <S.wrapper>Hello</S.wrapper>;
  }

  const max = Math.max(minBid.depth, maxAsk.depth);

  const spread = minAsk.price - maxBid.price;
  const spreadPercent =
    Math.round(((minAsk.price - maxBid.price) / minAsk.price) * 10000) / 100;

  return (
    <>
      <S.title>{`${feed} - ${product_id}`}</S.title>
      <S.title>{`${spread} Spread (${spreadPercent}%)`}</S.title>
      <S.title>{`${minBid.depth} - ${maxAsk.depth}`}</S.title>
      <S.wrapper>
        <Bids bids={finalBids} max={max} />
        <Asks asks={finalAsks} max={max} />
      </S.wrapper>
    </>
  );
};
