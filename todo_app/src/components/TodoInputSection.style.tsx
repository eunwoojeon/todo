import styled from "styled-components";

const InputSec = styled.div`
  width: var(--main-width);
  margin: var(--main-margin) 0 var(--main-margin) 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  flex-grow: 0;
  flex-shrink: 0;
  width: var(--button-length);
  height: var(--button-length);
  border-radius: calc(var(--button-length)/2);

  font-size: 1.1rem;
  font-weight: bold;

  background-color: ${props => props.theme.addBgColor};
  color: ${props => props.theme.textColor};
`;

export { InputSec, AddButton };
