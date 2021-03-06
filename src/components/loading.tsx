import { ScaleLoader } from 'react-spinners';
import { Colors } from 'src/styles/Colors';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => {
  return (
    <Wrapper>
      <ScaleLoader color={Colors.green} />
    </Wrapper>
  );
};
