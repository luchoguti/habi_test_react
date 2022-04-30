import styled, {css} from "styled-components";
import {device} from "./MediaQuerys";

export const ContainerGeneral = styled.div`
  display: flex;
`
export const ContainerSectionHmtl = styled.div`
  text-align: center;
  border: 2px dashed #D6F3FF;
  border-radius: 12px;
  padding: 22px;
  width: 100%;
`
export const BtnHome = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #00C29C;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.40em 1em;
  color: white;
  cursor: pointer;
  background: #00C29C;
  text-align: center;
  width: 25%;
  font-weight: bold;
`
export const DivHome = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-top: 6em;
`
export const CasitaHome = styled.div`
  width: 100%;
  ${this} > img {
    width: 25%;
  }
;
`
export const ContainerBtnSummary = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  margin-top: 1em;
  display: block;
  
  @media ${device.tablet} {
    display: none;
  }
`