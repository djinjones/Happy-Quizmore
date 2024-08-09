import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.background}; /* Background color based on theme */
  color: ${(props) => props.theme.text}; /* Text color based on theme */
  padding: 20px;
  text-align: center;
  border-top: 1px solid ${(props) => props.theme.borderColor}; /* Border at the top for separation */
  transition: all 0.5s ease;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1em;
`;

const FooterLink = styled.a`
  color: ${(props) => props.theme.buttonBackground}; /* Link color that matches button background */
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.buttonHover}; /* Hover effect for links */
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Adam Sandler Quiz. All rights reserved.</FooterText>
      <FooterText>
        <FooterLink href="/privacy">Privacy Policy</FooterLink> | 
        <FooterLink href="/terms">Terms of Service</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
