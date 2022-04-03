import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#50A7EA",
      contrastText: "#fff",

    },

    secondary: {
      main: "#313855",
    },

    text: {
      primary: "#313855",
      secondary: "#00000",
    },
    error: {
      main: "#FF5147",
    },
    action: {
      active: "#ffffff",
      hover: "#00000",
      disabledBackground: "#B2B2B2",
      disabled: "",
    },
  },
  typography: {
    fontFamily: "roboto, sans-serif",
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
