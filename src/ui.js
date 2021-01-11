import styled, { keyframes } from 'styled-components/macro';

const glow = keyframes`
from, to {
  color: black;
}

50% {
  color: rgba(225,0,0,.8);
}
`;

export const Num = styled.span`
  font-variant-numeric: tabular-nums;
  &.glow {
    animation: ${glow} 200ms infinite alternate;
  }
`;

