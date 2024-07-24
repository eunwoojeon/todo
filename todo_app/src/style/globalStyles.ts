import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* global css */
  #root {
    width: 100vw;
    height: 100vh;
  }

  * {
    /*opera*/
    box-sizing: border-box;
    /*firefox*/
    -moz-box-sizing: border-box;
    /*webkit chrome*/
    -webkit-box-sizing: border-box;
    font-family: Noto Sans KR, Pretendard, sans-serif;
    /* 줄바뀜 제거 */
    white-space: nowrap;
  }

  .title-font {
    font-family: Oleo Script;
  }

  .eng-font {
    font-family: Roboto;
  }

  button {
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }

  input {
    border: none;
    outline: none;
    background-color: transparent;
  }

  /* structure css */
  @media screen and (max-width: 768px) {
    body {
      min-width: 300px;
    }

    :root {
      --inputsec-margin: 50px;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --list-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;

      /* input width = (main width - 6rem) / 2 */
      --main-width: 500px;
      --input-width: 202px;
      --input-height: 4.5rem;
      --input-rel-top: 1.5rem;
      --list-height: 4.5rem;
      --item_span-width: 350px;

      --byte_displayer-ft-size: 0.8rem;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    :root {
      --inputsec-margin: 50px;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --list-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;

      /* input width = (main width - 6rem) / 2 */
      --main-width: 600px;
      --input-width: 252px;
      --input-height: 4.5rem;
      --input-rel-top: 1.5rem;
      --list-height: 4.5rem;
      --item_span-width: 450px;

      --byte_displayer-ft-size: 0.8rem;
    }
  }

  @media screen and (min-width: 1025px) {
    :root {
      --inputsec-margin: 50px;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --list-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;

      /* input width = (main width - 6rem) / 2 */
      --main-width: 800px;
      --input-width: 352px;
      --input-height: 4.5rem;
      --input-rel-top: 1.5rem;
      --list-height: 4.5rem;
      --item_span-width: 650px;

      --byte_displayer-ft-size: 0.8rem;
    }
  }
`;

export default GlobalStyles;