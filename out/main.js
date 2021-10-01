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
        const actions = ['openconnectionstrings'];
        let filterProvider = (0, providers_1.getFilterProvider)(documentSelector);
        let snippetProvider = (0, providers_1.getSnippetProvider)(documentSelector);
        context.subscriptions.push(filterProvider, snippetProvider); // , childrenProvider, textProvider
        if (config.hover === true) {
            context.subscriptions.push(providers_1.getHoverFilterProvider);
        }
        actions.forEach(action => {
            let disposable = vscode_1.commands.registerCommand(`rock-lava.${action}`, () => __awaiter(this, void 0, void 0, function* () {
                if (action == 'openconnectionstrings') {
                    const connectionStringFile = yield getConnectionStrings(vscode_1.workspace);
                    try {
                        yield vscode_1.workspace.fs.stat(vscode.Uri.parse(connectionStringFile));
                        vscode_1.commands.executeCommand('vscode.open', vscode.Uri.parse(connectionStringFile));
                    }
                    catch (_a) {
                        vscode_1.window.showInformationMessage(`Rock Connection Strings file does not exist.`);
                    }
                }
            }));
            context.subscriptions.push(disposable);
        });
    });
}
exports.activate = activate;
//# sourceMappingURL=main.js.map