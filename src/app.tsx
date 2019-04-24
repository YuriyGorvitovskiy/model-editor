
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
        <Drawer variant="permanent" anchor="left" 
                className={this.state.open ? "drawer-open" : "drawer-close"} 
                classes={{paper: this.state.open ? "drawer-paper-open" : "drawer-paper-close"}} 
                open={this.state.open}>
          <div id="drawer-toolbar-spacer"/>
          <div style={{display: 'flex',  height: '100%'}} >
            <List component="nav" style={{width: '64px'}} >
              <ListItem button aria-label="Tasks" onClick={()=>this.setState({open: !this.state.open})}>
                <ListItemIcon>
                  <Icon>list</Icon>
                </ListItemIcon>
              </ListItem>
            </List>
            <div style={{ borderLeft: '1px solid lightgrey', padding: '0', height: '100%' }} ></div>
            <List component="nav">
            { 
              this.state.filenames.map((filename) => (
                <ListItem button selected={filename === this.state.selected} onClick={() => this.onSelectFile(filename)} >
                  <ListItemText primary={filename.split('.').slice(0, -1).join('.')} />
                </ListItem>))
            }
            </List>
          </div>
        </Drawer>
        <main className="content">
          <pre>{this.state.content}</pre>
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