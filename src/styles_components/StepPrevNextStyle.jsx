import styled, {css} from "styled-components";

export const ButtonNextPrev = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #6501CF;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  color: white;
  cursor: pointer;
  background: #6501CF;
  max-height: 50px;
  height: 40px;
  ${props =>
          props.btnEnd &&
          css`
            background: transparent;
            color: #6501CF;
          `};
`