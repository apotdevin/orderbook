import { FC } from 'react';
import { Colors } from 'src/styles/Colors';
import styled from 'styled-components';

const Depth = styled.div`
  position: absolute;
  width: 300px;
  height: 20px;
  z-index: -999;
  left: 0;
  top: 0;
`;

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 20px;
`;

const ColoredLeft = styled.div<{ barWidth: number; barColor?: string }>`
  position: absolute;
  left: 0;
  width: ${({ barWidth }) => `${barWidth}px`};
  height: 20px;
  background-color: ${({ barColor }) => barColor || 'transparent'};
  z-index: -100;
`;

const ColoredRight = styled.div<{ barWidth: number; barColor?: string }>`
  position: absolute;
  right: 0;
  width: ${({ barWidth }) => `${barWidth}px`};
  height: 20px;
  background-color: ${({ barColor }) => barColor || 'transparent'};
`;

type DepthBarProps = {
  inverted?: boolean;
  max: number;
  value: number;
};

export const DepthBar: FC<DepthBarProps> = ({ max, value, inverted }) => {
  const percent = value / max;

  const width = 300 * percent;

  return (
    <Depth>
      <Wrapper>
        {inverted ? (
          <ColoredLeft barWidth={width} barColor={Colors.lightRed} />
        ) : (
          <ColoredLeft barWidth={300 - width} />
        )}
        {inverted ? (
          <ColoredRight barWidth={300 - width} />
        ) : (
          <ColoredRight barWidth={width} barColor={Colors.lightGreen} />
        )}
      </Wrapper>
    </Depth>
  );
};
