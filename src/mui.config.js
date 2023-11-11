import { createTheme } from "@mui/material/styles";

const LIGHTCOLORS = {
  primary: "#7635DC",
  primaryContrast: "#FFF",
  secondary: "#222831",
  secondaryContrast: "#EEF1F6",
  subtle: "#6C737F",
  highlight: "#f3f4f6",
};

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: LIGHTCOLORS.primary,
      contrastText: LIGHTCOLORS.primaryContrast,
    },
    secondary: {
      main: LIGHTCOLORS.secondary,
      contrastText: LIGHTCOLORS.secondaryContrast,
    },
    subtle: LIGHTCOLORS.subtle,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: LIGHTCOLORS.highlight,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme();
