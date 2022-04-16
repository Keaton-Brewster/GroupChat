import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-background: ${({ theme }) => theme.body};
    --main-text-color: ${({ theme }) => theme.text};;
    --active: ${({ theme }) => theme.LGActive}
  }`;
