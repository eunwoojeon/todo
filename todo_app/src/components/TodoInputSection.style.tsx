import styled from "styled-components";

const InputSec = styled.div`
  width: var(--main-width);
  margin: var(--inputsec-margin) 0 var(--inputsec-margin) 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;

  font-size: 1.1rem;
  font-weight: bold;

  background-color: ${props => props.theme.addBgColor};
  color: ${props => props.theme.textColor};
`;

export { InputSec, AddButton };
