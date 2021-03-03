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
  background: var(--background);
  opacity: 0.975;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}

.c-loader {
  animation: pulsate 1s infinite;
  border: 6px solid var(--gray-line);
  border-radius: 50%;
  border-top-color: var(--green);
  height: 3.75rem;
  width: 3.75rem;
}

@keyframes pulsate {
    0% {transform: scale(1.0, 1.0) rotate(0deg); opacity: 0.5;}
    50% {transform: scale(1.2, 1.2) rotate(1turn); opacity: 1;}
    100% {transform: scale(1.0, 1.0) rotate(360deg); opacity: 0.5;}
}

@media(max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media(max-width: 767px) {
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
