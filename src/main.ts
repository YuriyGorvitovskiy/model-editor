import { app, BrowserWindow, ipcMain } from "electron";
import * as FS from "fs";

let win = null;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    win.loadFile("./src/app.html");

    win.webContents.openDevTools();
}

ipcMain.on("request-model-files", (event, message) => loadModelFiles(win));
ipcMain.on("request-model-file-content", (event, file) => loadModelFileContent(win, file));
function loadModelFiles(window: BrowserWindow) {
    FS.readdir("./model", (err, filenames) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            return;
        }
        window.webContents.send("model-files", filenames);
    });
}

function loadModelFileContent(window: BrowserWindow, file: string) {
    FS.readFile("./model/" + file, "utf8", (err, data) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            return;
        }
        window.webContents.send("model-file-content", data.toString());
    });
}

app.on("ready", createWindow);
