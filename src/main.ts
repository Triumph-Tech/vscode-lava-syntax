import { ExtensionContext, window, workspace, Disposable, commands } from "vscode";
import * as vscode from 'vscode';

import { getProvider, getChildrenProvider, getTextProvider, getFilterProvider, getSnippetProvider, getHoverFilterProvider } from "./providers";

const config = vscode.workspace.getConfiguration('lava');

async function getRockWeb(workspace: any) {
	const foundFiles = await workspace.findFiles('**/web.config');
	const argconfigDirs = foundFiles
		.map((file: any) => file.path.replace(/web\.config$/, ''));
	argconfigDirs.sort((a: any, b: any) => a.split('/').length - b.split('/').length);
	return argconfigDirs[0]; //pick the shortest number of segments (top of tree)
}

async function getConnectionStrings(workspace: any) {
	const rockWebPath = await getRockWeb(workspace);
	return `${rockWebPath}web.ConnectionStrings.config`;
}

export async function activate(context: ExtensionContext) {
	let documentSelector: string | string[];
	documentSelector = "lava";

	const actions = ['openconnectionstrings'];


	let filterProvider = getFilterProvider(documentSelector);
	let snippetProvider = getSnippetProvider(documentSelector);


	context.subscriptions.push(filterProvider, snippetProvider); // , childrenProvider, textProvider

	if (config.hover === true) {
		context.subscriptions.push(getHoverFilterProvider);
	}

	actions.forEach(action => {
		let disposable = commands.registerCommand(`rock-lava.${action}`, async () => {
			if (action == 'openconnectionstrings') {

				const connectionStringFile = await getConnectionStrings(workspace);

				try {
					await workspace.fs.stat(vscode.Uri.parse(connectionStringFile));
					commands.executeCommand('vscode.open', vscode.Uri.parse(connectionStringFile));
				} catch {
					window.showInformationMessage(`Rock Connection Strings file does not exist.`);
				}
			}
		});
		context.subscriptions.push(disposable);
	});
}