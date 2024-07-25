import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
`;

const Title = styled.div`
  margin: 50px 0 50px 0;
  font-size: 4rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  >hr {
    align-self: stretch;
    width: var(--hr-width);
    border: 1px solid ${props => props.theme.hrBorderColor};
  }
`;

export { Div, Main, Title };
