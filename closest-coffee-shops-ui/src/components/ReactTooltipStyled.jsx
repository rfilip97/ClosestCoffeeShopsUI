import ReactTooltip from "react-tooltip";
import styled from "styled-components";

export const ReactTooltipStyled = styled(ReactTooltip)`
  &.type-dark.place-top {
    background-image: linear-gradient(to top left, red, orange);
    padding: 0.3rem 1rem;
    font-size: 50px;
    border-radius: 50px;
    padding: 25px;
    opacity: 0.9;
  }
`;
