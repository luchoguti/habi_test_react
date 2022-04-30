import styled, {css} from 'styled-components';
import {device} from "./MediaQuerys";

export const Container = styled.div`
  text-align: center;
  border: 2px dashed #D6F3FF;
  border-radius: 12px;
  padding: 22px;
  width: 100%;
  display: none;

  ${this} > h2 {
    text-decoration: underline wavy #D6F3FF;
  }
  
  ${props =>
          props.display_summary &&
          css`
            display: block;
            border:none;
          `};
  ${props =>
          props.page_summary &&
          css`
            width: 96%;
            text-align: justify-all;
            border: none;
          `};
  @media ${device.tablet} {
    display: block;
  }
`
export const ContainerTwo = styled.section`
  display: flex;

  ${this} > p {
    margin-right: 8px;
  }
;

  ${this} > p:first-of-type {
    font-family: "Book Antiqua";
    font-weight: bold;
  }
;

  ${this} > ul > li > p {
    margin-right: 8px;
  }
;

  ${this} > ul > li > p:first-of-type {
    font-family: "Book Antiqua";
    font-weight: bold;
  }

  ${props =>
          props.display_table &&
          css`
            display: table;
            text-align: left;
          `};
`
export const BtnSteps = styled.button`
  color: black;
  background: #D6F3FF;
  border-radius: 10px;
  height: 20px;
  position: relative;
  top: 14px;
  margin-right: 8px;
`
export const Li = styled.li`
  display: flex;
`