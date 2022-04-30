import styled, { css } from 'styled-components'

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #6501CF;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  color: white;
  cursor: pointer;
  background: #6501CF;
  
  ${props =>
    props.active_step &&
    css`
      color: black;
      background: #D6F3FF;
      border: 2px solid #D6F3FF;
    `};
  ${props =>
      props.complete_step &&
      css`
      background: #03EDC3;
      border: 2px solid #03EDC3;
    `};
  ${props =>
      props.view_summary &&
      css`
      background: transparent;
      color: black;
      border: 2px solid #03EDC3;
        font-weight: bold;
    `};
`
export const Container = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;

`