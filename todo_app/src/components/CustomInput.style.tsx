import styled from "styled-components";

const TodoInput = styled.div`
  width: var(--input-width);
  height: var(--input-height);
  margin-right: var(--input-right-margin);
  padding-left: var(--input-left-padding);

  border-radius: 20px;

  border: 2px solid ${props => props.theme.inputBgColor};
  background-color: ${props => props.theme.inputBgColor};
  &:hover {
    border: 2px solid ${props => props.theme.inputBgColorHover};
  }

  &>input {
    width: 100%;
    position: relative;
    top: var(--input-rel-top);

    color: ${props => props.theme.textColor};
    &::placeholder {
      color: ${props => props.theme.placeHolderTextColor};
    }
  }

  &>span {
    position: relative;
    top: 3rem;
    right: 5rem;

    font-size: var(--byte_displayer-ft-size);

    color: ${props => props.theme.placeHolderTextColor};
  }
`;

export { TodoInput };