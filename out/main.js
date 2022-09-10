"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const vscode = require("vscode");
const providers_1 = require("./providers");
const util_1 = require("util");
const config = vscode.workspace.getConfiguration('lava');
function getRockWeb(workspace) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundFiles = yield workspace.findFiles('**/web.config');
        const argconfigDirs = foundFiles
            .map((file) => file.path.replace(/web\.config$/, ''));
        argconfigDirs.sort((a, b) => a.split('/').length - b.split('/').length);
        return argconfigDirs[0]; //pick the shortest number of segments (top of tree)
    });
}
function getConnectionStrings(workspace) {
    return __awaiter(this, void 0, void 0, function* () {
        const rockWebPath = yield getRockWeb(workspace);
        return `${rockWebPath}web.ConnectionStrings.config`;
    });
}
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let documentSelector;
        documentSelector = "lava";
        const actions = ['openconnectionstrings', 'newLava', 'openFileInRock', 'openFolderInRock', 'copyTextToClipboard', 'enableMenus', 'disableMenus'];
        let filterProvider = (0, providers_1.getFilterProvider)(documentSelector);
        let snippetProvider = (0, providers_1.getSnippetProvider)(documentSelector);
        context.subscriptions.push(filterProvider, snippetProvider); // , childrenProvider, textProvider
        if (config.hover === true) {
            context.subscriptions.push(providers_1.getHoverFilterProvider);
        }
        actions.forEach(action => {
            let disposable = vscode_1.commands.registerCommand(`rock-lava.${action}`, (target) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (action == 'openconnectionstrings') {
                    const connectionStringFile = yield getConnectionStrings(vscode_1.workspace);
                    try {
                        yield vscode_1.workspace.fs.stat(vscode.Uri.parse(connectionStringFile));
                        vscode_1.commands.executeCommand('vscode.open', vscode.Uri.parse(connectionStringFile));
                    }
                    catch (_c) {
                        vscode_1.window.showInformationMessage(`Rock Connection Strings file does not exist.`);
                    }
                }
                else if (action == 'openFileInRock') {
                    if (target !== undefined) {
                        const folders = vscode.workspace.workspaceFolders;
                        if (!folders || folders.length === 0) {
                            vscode_1.window.showInformationMessage('No workspace folder is open. Please open a workspace folder first.');
                            throw new Error('No workspace folder is open. Please open a workspace folder first.');
                        }
                        if (folders.length === 1) {
                            var path = target.path;
                            // if path contains "rockweb"
                            if (path.includes("RockWeb")) {
                                path = path.split('RockWeb')[1].replaceAll('/', '%2f');
                                let output = config.rockUrl + config.rockFileEditorPath + "?RelativeFilePath=~" + path;
                                vscode.env.openExternal(vscode.Uri.parse(output, true));
                            }
                            else {
                                vscode_1.window.showInformationMessage('Please open a RockWeb folder first.');
                            }
                        }
                        else {
                            if (config.workspaceRoot !== '' && config.workspaceSitePath !== '') {
                                const workspaceRoot = String(config.workspaceRoot);
                                const workspaceSitePath = String(config.workspaceSitePath).replaceAll('/', '%2f');
                                const uri = (_a = folders === null || folders === void 0 ? void 0 : folders.find(folder => folder.name === workspaceRoot)) === null || _a === void 0 ? void 0 : _a.uri;
                                const folderRoot = String(config.rockFolderRoot);
                                if (!uri) {
                                    throw new Error("Could not find Workspace Root folder.");
                                }
                                let output = config.rockUrl + config.rockFileEditorPath + "?RelativeFilePath=~%2f" + workspaceSitePath + target.path.replace(uri.path, '').replace('RockWeb' + '/', folderRoot).replaceAll('/', '%2f');
                                vscode.env.openExternal(vscode.Uri.parse(output, true));
                            }
                            else {
                                if (config.workspaceRoot === '') {
                                    vscode_1.window.showErrorMessage('Please set the workspace root in the settings.');
                                }
                                if (config.workspaceSitePath === '') {
                                    vscode_1.window.showErrorMessage('Please set the workspace site path in the settings.');
                                }
                            }
                        }
                    }
                }
                else if (action == 'openFolderInRock') {
                    if (target !== undefined) {
                        const folders = vscode.workspace.workspaceFolders;
                        if (!folders || folders.length === 0) {
                            vscode_1.window.showInformationMessage('No workspace folder is open. Please open a workspace folder first.');
                            throw new Error('No workspace folder is open. Please open a workspace folder first.');
                        }
                        if (folders.length === 1) {
                            var path = target.path;
                            // if path contains "rockweb"
                            if (path.includes("RockWeb")) {
                                path = path.split('RockWeb')[1].replaceAll('/', '%2f');
                                let output = config.rockUrl + config.rockFileManagerPath + "?RelativeFilePath=~" + path;
                                // get first file inside target folder
                                let files = yield vscode_1.workspace.fs.readDirectory(target);
                                if (files.length > 0) {
                                    output = output + '%2f' + files[0][0];
                                    vscode.env.openExternal(vscode.Uri.parse(output, true));
                                    return;
                                }
                                vscode_1.window.showErrorMessage('Cannot open folder in Rock. Folder is empty.');
                            }
                        }
                        else {
                            if (config.workspaceRoot !== '' && config.workspaceSitePath !== '') {
                                const workspaceRoot = String(config.workspaceRoot);
                                const workspaceSitePath = String(config.workspaceSitePath).replaceAll('/', '%2f');
                                const uri = (_b = folders === null || folders === void 0 ? void 0 : folders.find(folder => folder.name === workspaceRoot)) === null || _b === void 0 ? void 0 : _b.uri;
                                if (!uri) {
                                    throw new Error("Could not find Workspace Root folder.");
                                }
                                // get first file inside target folder
                                let files = yield vscode_1.workspace.fs.readDirectory(target);
                                if (files.length > 0) {
                                    let firstFile = files[0][0];
                                    let output = config.rockUrl + config.rockFileManagerPath + "?RelativeFilePath=~%2f" + workspaceSitePath + target.path.replace(uri.path, '').replaceAll('/', '%2f') + '%2f' + firstFile;
                                    vscode.env.openExternal(vscode.Uri.parse(output, true));
                                }
                            }
                            else {
                                if (config.workspaceRoot === '') {
                                    vscode_1.window.showErrorMessage('Please set the workspace root in the settings.');
                                }
                                if (config.workspaceSitePath === '') {
                                    vscode_1.window.showErrorMessage('Please set the workspace site path in the settings.');
                                }
                            }
                        }
                    }
                }
                else if (action == 'copyTextToClipboard') {
                    // Copy contents of the target to the clipboard
                    if (target !== undefined) {
                        let content = undefined;
                        if (target.scheme === 'file') {
                            try {
                                // if vscode has any visible text exitors
                                if (vscode.window.visibleTextEditors.length > 0) {
                                    // loop through all visible text editors
                                    vscode.window.visibleTextEditors.forEach(editor => {
                                        // if the editor is open in the same file as the target
                                        if (editor.document.uri.path == target.path) {
                                            // get the contents of the editor
                                            content = editor.document.getText();
                                            return;
                                        }
                                    });
                                }
                                if (content === undefined) {
                                    const data = yield vscode_1.workspace.fs.readFile(target);
                                    content = new util_1.TextDecoder("utf-8").decode(data);
                                }
                            }
                            catch (_d) {
                                vscode_1.window.showErrorMessage('Could not read file.');
                            }
                        }
                        if (content !== undefined) {
                            vscode.env.clipboard.writeText(content);
                            vscode_1.window.showInformationMessage('Copied to clipboard.');
                            vscode.commands.executeCommand('rock-lava.openFileInRock', target);
                            vscode_1.window.showInformationMessage('Launching Rock File Editor.');
                        }
                    }
                }
                else if (action == 'enableMenus') {
                    vscode.workspace.getConfiguration("lava").update("showExplorerContextMenu", true, true);
                }
                else if (action == 'disableMenus') {
                    vscode.workspace.getConfiguration("lava").update("showExplorerContextMenu", false, true);
                }
            }));
            context.subscriptions.push(disposable);
        });
    });
}
exports.activate = activate;
//# sourceMappingURL=main.js.map