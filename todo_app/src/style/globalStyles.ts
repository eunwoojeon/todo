import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .todoApp {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }

  .main > hr {
    border: 1px solid ${props => props.theme.hrBorderColor};
  }

  .item:has(.read) {
    background-color: ${props => props.theme.listBgColor};
  }

  .add-btn {
    background-color: ${props => props.theme.addBgColor};
    color: ${props => props.theme.textColor};
  }

  .login-btn {
    background-color: ${props => props.theme.loginBgColor};
    color: ${props => props.theme.loginTextColor};
  }

  .modal-btn {
    background-color: ${props => props.theme.modalBtnBgColor};
    &:hover {
      background-color: ${props => props.theme.modalBtnBgColorHover};
    }
  }

  .custom-input {
    border: 2px solid ${props => props.theme.inputBgColor};
    background-color: ${props => props.theme.inputBgColor};

    &:hover {
      border: 2px solid ${props => props.theme.inputBgColorHover};
    }
  }

  .custom-input>input {
    color: ${props => props.theme.textColor};

    &::placeholder {
      color: ${props => props.theme.placeHolderTextColor};
    }
  }

  .custom-input>.byte_displayer {
    color: ${props => props.theme.placeHolderTextColor};
  }

  .fontawesome {
    color: ${props => props.theme.fontAwesome};
  }
`;

export default GlobalStyles;