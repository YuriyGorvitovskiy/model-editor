import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
    typography: {
        fontFamily: "Roboto",
    },
    overrides: {
        MuiSvgIcon: {
            // Disable background-color, so we can control color with the style
            root: {
                fontSize: null,
            },
        },
    },
});
