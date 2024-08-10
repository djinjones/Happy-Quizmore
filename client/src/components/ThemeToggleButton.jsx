import styled from 'styled-components';

const ToggleButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin: 10px;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const ThemeToggleButton = ({ toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      Toggle Theme
    </ToggleButton>
  );
};

export default ThemeToggleButton;
