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
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.67)",
          backdropFilter: "blur(45px)",
          borderRadius: "15px",
          border: "1px solid #F0F2F4",
          boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
          paddingBottom: "0px",
        },
        list: {
          padding: "0px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          border: "1px dashed #d4dbe3",
        },
      },
    },
  },
});

export const darkTheme = createTheme();
