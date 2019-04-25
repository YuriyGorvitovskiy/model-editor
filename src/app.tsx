
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ipcRenderer } from "electron";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

interface IState {
    content: string;
    filenames: string[];
    open: boolean;
    selected: string;
};

export class App extends React.Component<{}, IState > {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      filenames: [], 
      open: false,
      selected: null
    };
    ipcRenderer.on("model-files", (event, files) => {
      this.setState({filenames: files});
    });
    ipcRenderer.on("model-file-content", (event, content) => {
      this.setState({content});
    });
    ipcRenderer.send("request-model-files", "");
  }


  public render() {
    const ID = "id";
    const TYPE = "type";
    const TARGET = "target";
    const info = this.state.content ? JSON.parse(this.state.content) : {};
    const id = info[ID]; 
    delete info[ID];
    
    return (
      <div id="app-window">
        <CssBaseline />
        <AppBar id="app-bar" position="fixed" >
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
              Model Editor
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <List component="nav" >
            <ListItem button aria-label="Tasks" onClick={()=>this.setState({open: !this.state.open})}>
              <ListItemIcon>
                <Icon>list</Icon>
              </ListItemIcon>
            </ListItem>
          </List>
          <List component="nav" style={{display: this.state.open ? "block" : "none" }}>
          { 
            this.state.filenames.map((filename) => (
              <ListItem key={filename} button selected={filename === this.state.selected} onClick={() => this.onSelectFile(filename)} >
                <ListItemText primary={filename.split('.').slice(0, -1).join('.')} />
              </ListItem>))
          }
          </List>
          <article> 
          {
            this.state.selected 
            ? (
              <Card>
                <CardHeader avatar={ <Avatar aria-label="Class" >C</Avatar>}
                            title={this.state.selected.split('.').slice(0, -1).join('.')} />
                <CardContent>
                <Table style={{width: "100%"}}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attribute Name</TableCell>
                      <TableCell align="right">Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      id
                      ? (
                        <TableRow key={ID}>
                          <TableCell component="th" scope="row">{ID}</TableCell>
                          <TableCell align="right">{id[TYPE] === "reference" ? id[TARGET] : id[TYPE]}</TableCell>
                        </TableRow>
                      ) 
                      : null
                    }
                    {
                      Object.keys(info).sort().map(name => (
                        <TableRow key={name}>
                          <TableCell component="th" scope="row">{name}</TableCell>
                          <TableCell align="right">{info[name][TYPE] === "reference" ? info[name][TARGET] : info[name][TYPE]}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </CardContent>
              </Card>
            ) 
            : null
          }
          </article>
        </main>
      </div>          
    );
  }

  private onSelectFile(filename: string): void {
    this.setState({
      content: "",
      selected: filename
    });
    ipcRenderer.send("request-model-file-content", filename);
  }
}
ReactDOM.render(<App />, document.querySelector('#app'));