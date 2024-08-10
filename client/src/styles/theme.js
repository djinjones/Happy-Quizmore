import lightImage from '../assets/images/light.jpg';
import darkImage from '../assets/images/dark.jpg';

export const lightTheme = {
  body: '#F9F9F9', // Light background color for the main content area
  text: '#333333', // Dark text for good contrast on a light background
  background: '#FFFFFF', // Background for components like cards, modals, etc.
  cardBackground: '#FFFFFF', // Pure white card background
  buttonBackground: '#4CAF50', // Inviting green color for buttons
  buttonText: '#FFFFFF', // White text for buttons
  buttonHover: '#45a049', // Slightly darker green on hover for better UX
  borderColor: '#E0E0E0', // Light grey borders
  modalBackground: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modals
  navbarBackgroundImage: `url(${lightImage})`, // Background image for navbar in light theme
  iconColor: '#FFD700', // Gold color for the sun icon (angel theme)
};

export const darkTheme = {
  body: '#121212', // Very dark background color for the main content area
  text: '#FFFFFF', // Bright text for high contrast on a dark background
  background: '#1F1F1F', // Dark background for components like cards, modals, etc.
  cardBackground: '#1F1F1F', // Slightly lighter dark card background
  buttonBackground: '#BB86FC', // Soft purple color for buttons
  buttonText: '#FFFFFF', // White text for buttons
  buttonHover: '#985EFF', // Slightly brighter purple on hover
  borderColor: '#444444', // Dark grey borders
  modalBackground: 'rgba(255, 255, 255, 0.1)', // Slightly visible white overlay for modals
  navbarBackgroundImage: `url(${darkImage})`, // Background image for navbar in dark theme
  iconColor: '#FF4500', // Bright orange-red for the moon icon (devil theme)
};
