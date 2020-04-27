import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ClassList from './class-list';
import 'typeface-roboto';

import theme from './theme';


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ClassList/>
    </ThemeProvider>, 
    document.getElementById("rootElement"));