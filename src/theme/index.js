const { createTheme } = require('@material-ui/core');

const theme = createTheme({
  palette: {
    primary: {
      main: '#46B9F6',
      contrastText: '#fff',
    },
    secondary: {
      lighter: '#C8FACD',
      light: '#5BE584',
      main: '#00AB55',
      dark: '#007B55',
      darker: '#005249',
      contrastText: '#fff',
    },
    success: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
      contrastText: '#212B36',
    },
    warning: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
      contrastText: '#212B36',
    },
    error: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
      contrastText: '#fff',
    },
  },
});

export default theme;
