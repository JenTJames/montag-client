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
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: LIGHTCOLORS.highlight,
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#050505DD",
        },
      },
    },
  },
});

export const darkTheme = createTheme();
