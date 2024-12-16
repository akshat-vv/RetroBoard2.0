import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A4A4A', // Slate Grey
    },
    secondary: {
      main: '#B0B0B0', // Silver Grey
    },
    background: {
      default: '#F5F5F5', // Light Smoke Grey
      paper: '#E0E0E0',   // Light Grey
    },
    text: {
      primary: '#1C1C1C', // Off-Black
      secondary: '#8C8C8C', // Muted Grey
    },
    action: {
      hover: '#505050', // Gunmetal Grey
    },
    highlight: {
      main: '#007BFF', // Gold
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
