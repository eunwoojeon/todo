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
  width: var(--item-width);
  height: var(--item-height);
  margin: var(--item-vertical-margin) 0 var(--item-vertical-margin) 0;

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
  flex-shrink: 0;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 0 0 1rem;

  white-space: wrap;
  overflow: hidden;

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

const ButtonPanel = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: var(--button-length);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export { ListSec, RefreshFontAwesomeIcon, Item, CheckBox, OutputPanel, ButtonPanel };
