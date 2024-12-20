import '@fontsource/poppins'; // Defaults to 400 weight
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './store/store'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures global styles */}
      <App />
    </ThemeProvider>
  </Router>
  </Provider>

);
