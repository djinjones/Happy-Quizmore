import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body}; /* Background color based on theme */
    color: ${(props) => props.theme.text}; /* Text color based on theme */
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    transition: all 0.5s ease; /* Smooth transition when switching themes */
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.text}; /* Ensure all headings use theme text color */
  }

  p {
    color: ${(props) => props.theme.text}; /* Ensure all paragraphs use theme text color */
  }

  input, textarea {
    background-color: ${(props) => props.theme.cardBackground}; /* Background for form elements */
    color: ${(props) => props.theme.text}; /* Text color for form elements */
    border: 1px solid ${(props) => props.theme.borderColor}; /* Border color based on theme */
    padding: 10px;
    font-size: 1em;
    border-radius: 4px;
  }

  button {
    background-color: ${(props) => props.theme.buttonBackground}; /* Button background color */
    color: ${(props) => props.theme.buttonText}; /* Button text color */
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    &:hover {
      background-color: ${(props) => props.theme.buttonHover}; /* Button hover effect */
    }
  }
`;

export default GlobalStyle;
