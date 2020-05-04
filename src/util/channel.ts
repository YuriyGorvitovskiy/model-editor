import * as Electron from "electron";
import * as UUID from "uuid";

import * as Glue from "state-glue";

export const resolveContext = async <P, C>(params: P, context: Glue.ContextDeclaration<C>): Promise<C> => {
    const responseChannel = "context-resolved-for-" + UUID.v4();
    Electron.ipcRenderer.send("resolve-context", {
        context,
        params: {},
        responseChannel,
    });
    return new Promise((resolve) => {
        Electron.ipcRenderer.once(responseChannel, (event, response) => resolve(response));
    });
};
