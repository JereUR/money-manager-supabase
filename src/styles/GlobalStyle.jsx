import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

:root{
  --primary-color:#222260;
  --primary-color2:rgba(34, 34, 96, 0.8);
  --primary-color3:rgba(34, 34, 96, 0.4);
  --border-color:rgba(182, 182, 197, 0.7);
  --color-green:#66b436;
  --color-grey:#aaa;
  --color-accent:#F56692;
  --color-delete:#e20d0d;
}

body{
  font-family: 'Nunito', sans-serif;
  font-size: clamp(1rem,1.5vw,1.2rem);
  overflow: hidden;
  color: var(--primary-color2)
}

h1,h2,h3,h4,h5,h6{
  color: var(--primary-color);
}
`
