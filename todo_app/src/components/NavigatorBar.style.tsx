import styled from "styled-components";
import { StyledFontAwesomeIcon } from "../style/common.style";

const NaviBar = styled.div`
  width: 100%;
  min-width: 300px;
  padding: 1rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginButton = styled.button`
  margin-left: 1rem;
  height: 2.4rem;
  padding: 0 1rem 0 1rem;
  border-radius: 1.2rem;

  font-size: 0.9rem;
  font-weight: bold;

  background-color: ${props => props.theme.loginBgColor};
  color: ${props => props.theme.loginTextColor};
`;

const ModalButton = styled.button`
  width: 14rem;
  height: 2.4rem;
  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 1.2rem;
  font-size: 0.9rem;

  background-color: ${props => props.theme.modalBtnBgColor};
  &:hover {
    background-color: ${props => props.theme.modalBtnBgColorHover};
  }
`;

const ModalButtonPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const XmarkFontAwesomeIcon = styled(StyledFontAwesomeIcon)`
  color: #000000;
  float: right;
`;

export { LoginButton, ModalButton, ModalButtonPanel, NaviBar, XmarkFontAwesomeIcon };

