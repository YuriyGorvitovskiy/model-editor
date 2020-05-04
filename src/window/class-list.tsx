import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as Glue from 'state-glue';

import * as Channel from '../util/channel';

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

export default () =>  {
    const [list, setList] = React.useState([] as string[]);

    const processList = async () => {
        setList((await Channel.resolveContext({}, context)).classes);
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
