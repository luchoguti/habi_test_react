import styled, {css} from "styled-components";
import {device} from "./MediaQuerys";

export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 10px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  ${props =>
          props.open_modal &&
          css`
            display: block;
          `};
  ${props =>
          props.close_modal &&
          css`
            display: none;
          `};
`
export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 150%;
  @media ${device.tablet} {
    height: 100%;
  }
`
export const ModalClose = styled.div`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  ${this}:hover, ${this}:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`