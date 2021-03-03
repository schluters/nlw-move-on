import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root {
  --shape: ${props => props.theme.colors.shape};
  --background: ${props => props.theme.colors.background};
  --gray-line: ${props => props.theme.colors.grayLine};
  --text: ${props => props.theme.colors.text};
  --text-highlight: ${props => props.theme.colors.textHighlight};
  --title: ${props => props.theme.colors.title};
  --red: #E83F5B;
  --green: #4CD62B;
  --blue: #5965E0;
  --blue-dark: #4953B8;
  --blue-twitter: #2AA9E0;
  --invert-white: ${props => props.theme.colors.invertWhite};
  --invert-black: ${props => props.theme.colors.invertBlack};
  --overlay: ${props => props.theme.colors.overlay};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: var(--text-highlight);
}

.loading {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  transform: scale(2);
  background: var(--background);
  opacity: 0.75;
}

.c-loader {
  animation: is-rotating 1s infinite;
  border: 6px solid var(--gray-line);
  border-radius: 50%;
  border-top-color: var(--green);
  height: 50px;
  width: 50px;
}

@keyframes is-rotating {
  to {
    transform: rotate(1turn);
    transform: scale(1.2);
  }
}

@media(max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media(max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  background: var(--background);
  color:  var(--text);
}

body, input, textarea, button {
  font: 400 1rem "Inter", sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
