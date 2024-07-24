import styled from "styled-components";
import { StyledFontAwesomeIcon } from "../style/common.style";

const ListSec = styled.div`
  display: flex;
  flex-direction: column;
`;

const RefreshFontAwesomeIcon = styled(StyledFontAwesomeIcon)`
  margin-left: auto;
`;

const Item = styled.div`
  width: var(--main-width);
  height: var(--list-height);
  margin: var(--list-vertical-margin) 0 var(--list-vertical-margin) 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 20px;

  &:has(.read) {
    padding: 0 var(--item-horizontal-padding) 0 var(--item-horizontal-padding);
    background-color: ${props => props.theme.listBgColor};
  }

  &:has(input:checked) {
    text-decoration: line-through;
    text-decoration-thickness: 3px;
  }
`;

const CheckBox = styled.input`
  position: relative;
  width: 28px;
  height: 28px;
  background-color: #CFCFCF;
  border-radius: 15px;
  appearance: none;
  cursor: pointer;

  &:checked {
    background-color: #76D7EA;
  }

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 9px;
    width: 5px;
    height: 13px;
    border: 4px solid transparent;
    border-left: none;
    border-top: none;
    transform: rotate(45deg) scale(1);
  }
  
  &:checked::before {
    border-color: #FFF;
    animation: checkAnim .2s ease;  
  }
  
  @keyframes checkAnim {
    from {
      transform: rotate(45deg) scale(0);
    }
  }
`;

const OutputPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  :first-child {
    font-size: 1.5rem;
  }

  >span {
    width: var(--item_span-width);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const EditingPanel = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonPanel = styled.div`
  width: 4rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export { ListSec, RefreshFontAwesomeIcon, Item, CheckBox, OutputPanel, EditingPanel, ButtonPanel };
