import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* global css */
  body {
    width: 100vw;
    height: 100vh;
    min-width: 300px;
  }

  #root {
    width: 100%;
    height: 100%;
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
    :root {
      /* todo main */
      --main-width: 95vw;
      --main-min-width: 300px;
      --main-margin: 1.5rem;

      /* todo input */
      --input-width: 40%;
      --input-height: 4rem;
      --button-length: 4rem;
      --input-rel-top: 1.25rem;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --byte_display-top: 2.5rem;

      /* hr */
      --hr-width: 100%;

      /* todo item */
      --item-width: 95vw;
      --item-height: 4.5rem;
      --item-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;
      --item_span-width: auto;

      /* font-size */
      --byte_displayer-ft-size: 0.8rem;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    :root {
      /* todo main */
      --main-width: 600px;
      --main-min-width: 300px;
      --main-margin: 50px;

      /* todo input */
      --input-width: 252px;
      --input-height: 4.5rem;
      --button-length: 4.5rem;
      --input-rel-top: 1.5rem;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --byte_display-top: 3rem;

      /* hr */
      --hr-width: 100%;

      /* todo item */
      --item-width: 600px;
      --item-height: 4.5rem;
      --item-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;
      --item_span-width: auto;

      /* font-size */
      --byte_displayer-ft-size: 0.8rem;
    }
  }

  @media screen and (min-width: 1025px) {
    :root {
      /* todo main */
      --main-width: 800px;
      --main-min-width: 300px;
      --main-margin: 50px;

      /* todo input */
      --input-width: 352px;
      --input-height: 4.5rem;
      --button-length: 4.5rem;
      --input-rel-top: 1.5rem;
      --input-right-margin: 1rem;
      --input-left-padding: 0.4rem;
      --byte_display-top: 3rem;

      /* hr */
      --hr-width: 100%;

      /* todo item */
      --item-width: 800px;
      --item-height: 4.5rem;
      --item-vertical-margin: 1.25rem;
      --item-horizontal-padding: 1rem;
      --item_span-width: auto;

      /* font-size */
      --byte_displayer-ft-size: 0.8rem;
    }
  }
`;

export default GlobalStyles;