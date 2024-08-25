import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const light = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
const dark = createMuiTheme ({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#f48fb1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#424242',
      paper: '#303030',
    },
  }
});
export const toggleMode = (setCurrentTheme) => {
  const mode = setCurrentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('mode', mode);
  return mode;
}

export const getCurrentMode = () => {
  const savedTheme = localStorage.getItem('mode');
  return savedTheme || 'light'
}
export { light, dark };
