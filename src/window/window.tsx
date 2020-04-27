import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ClassIcon from '@material-ui/icons/Class';
import 'typeface-roboto';

import theme from './theme';
import { Typography } from "@material-ui/core";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Typography variant='h1'><ClassIcon/> Hello Electron</Typography>
    </ThemeProvider>, 
    document.getElementById("rootElement"));