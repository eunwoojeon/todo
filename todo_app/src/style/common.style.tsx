import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.fontAwesome};
  cursor: pointer;
`;

export { StyledFontAwesomeIcon };
