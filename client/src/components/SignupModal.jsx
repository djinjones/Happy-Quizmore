
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

const SignupModal = ({ setShowSignup }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={() => setShowSignup(false)}>X</CloseButton>
        <h2>Signup</h2>
        {/* Signup form goes here */}
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupModal;
