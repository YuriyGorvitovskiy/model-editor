import React from 'react';
import {ipcRenderer} from 'electron';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as Glue from 'state-glue';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

interface Context {
    classes: string[]
};

const context: Glue.ContextDeclaration<Context> = {
    classes: {
        start: Glue.Start.GLOBAL,
        value: null,
        steps: [{
            type: "Class",
            in_attr: null,
            out_attr: "name",
            filters: [],
            sortings: [],
            page: {
                begin: 0,
                max: 10000,
            }
        }]
    }
}
const requestList = async(): Promise<string[]> => {
    const responseChannel = "context-resolved-for-" + new Date().getTime();
    ipcRenderer.send("resolve-context", {
        context,
        params: {},
        responseChannel
    });
    return new Promise(resolve => {
        ipcRenderer.once(responseChannel, (event, response) => resolve(response));
    });
}

export default () =>  {
    const [list, setList] = React.useState([] as string[]);

    const processList = async () => {
        setList(await requestList());
    };
    React.useEffect(() => {
        processList();
    }, []);

    const classes = useStyles();

    return (
        <List component="nav" className={classes.root}>
            {list.map((s, i) => (<ListItem key={i} button >{s}</ListItem>))}
        </List>
    );
}
