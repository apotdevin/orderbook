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

export const Header = () => {
  return <Wrapper>Orderbook Example</Wrapper>;
};
