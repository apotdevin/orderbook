import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  margin-bottom: 32px;
`;

const Link = styled.a`
  margin-left: 8px;
  text-decoration: none;
  color: orange;

  :hover {
    color: darkorange;
  }
`;

export const Header = () => {
  return (
    <Wrapper>
      <span role="img" aria-label={'rocket'} style={{ marginRight: '8px' }}>
        🚀
      </span>
      BTC Orderbook
      <span role="img" aria-label={'rocket'} style={{ margin: '0 8px' }}>
        🚀
      </span>
      by
      <Link href={'https://twitter.com/tonyioi'} target={'__blank'}>
        @tonyioi
      </Link>
    </Wrapper>
  );
};
