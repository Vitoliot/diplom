import { createTheme } from "@material-ui/core";
import AthelasRegular from "./fonts/Athelas/Athelas-Regular.ttf";
import UbuntuRegular from "./fonts/Ubuntu/Ubuntu-Regular.ttf";

const readingTheme = createTheme({
  typography: {
    fontFamily: "Athelas, Arial",
    fontSize: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Athelas';
            font-style: regular;
            font-display: swap;
            font-weight: 400;
            src: local('Athelas'), local('Athelas-Regular'), url(${AthelasRegular}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
  },
});

const interfaceTheme = createTheme({
  typography: {
    fontFamily: "Ubuntu, Arial",
    fontSize: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Ubuntu';
            font-style: regular;
            font-display: swap;
            font-weight: 400;
            src: local('Ubuntu'), local('Ubuntu-Regular'), url(${UbuntuRegular}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
  },
});
