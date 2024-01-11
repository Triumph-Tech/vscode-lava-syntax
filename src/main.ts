import { ExtensionContext, window, workspace, Disposable, commands } from "vscode";
import * as vscode from 'vscode';

import { getProvider, getChildrenProvider, getTextProvider, getFilterProvider, getSnippetProvider, getHoverFilterProvider } from "./providers";
import { Context } from "vm";
import { TextDecoder } from "util";

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

export async function activate(context: Context) {
	let documentSelector: string | string[];
	const htmlExtension = vscode.extensions.getExtension('vscode.html-language-features');
	let language = window.activeTextEditor?.document.languageId;
	if (!htmlExtension) {
		vscode.window.showErrorMessage('The "vscode.html-language-features" extension is required to use this extension.');
	}

	if (language === 'lava') {
		htmlExtension?.activate();
	}

	// for xaml getLanguageService and set use
	if (language === 'lava' || language === 'xaml') {
		
		let documentSelector = ["lava","xaml"];
		let filterProvider = getFilterProvider(documentSelector);
		let snippetProvider = getSnippetProvider(documentSelector);
		context.subscriptions.push(filterProvider, snippetProvider); // , childrenProvider, textProvider
	}

	const actions = ['openconnectionstrings','newLava','openFileInRock','openFolderInRock', 'copyTextToClipboard', 'enableMenus', 'disableMenus'];

	if (config.hover === true) {
		context.subscriptions.push(getHoverFilterProvider);
	}

	actions.forEach(action => {
		let disposable = commands.registerCommand(`triumphtech.rock-lava.${action}`, async (target?: vscode.Uri) => {
			if (action == 'openconnectionstrings') {

				const connectionStringFile = await getConnectionStrings(workspace);

				try {
					await workspace.fs.stat(vscode.Uri.parse(connectionStringFile));
					commands.executeCommand('vscode.open', vscode.Uri.parse(connectionStringFile));
				} catch {
					window.showInformationMessage(`Rock Connection Strings file does not exist.`);
				}
			} else if (action == 'openFileInRock') {
				if (target !== undefined) {
						const folders = vscode.workspace.workspaceFolders;
						if(!folders || folders.length === 0) {
							window.showInformationMessage('No workspace folder is open. Please open a workspace folder first.');
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
						} else {
							if (config.workspaceRoot !== '' && config.workspaceSitePath !== '') {
								const workspaceRoot = String(config.workspaceRoot);
								const workspaceSitePath = String(config.workspaceSitePath).replaceAll('/', '%2f');
								const uri = folders?.find(folder => folder.name === workspaceRoot)?.uri;
								const folderRoot = String(config.rockFolderRoot);

								if (!uri) {
									throw new Error("Could not find Workspace Root folder.");
								}
								let output = config.rockUrl + config.rockFileEditorPath + "?RelativeFilePath=~%2f" + workspaceSitePath + target.path.replace(uri.path, '').replace('RockWeb' + '/', folderRoot).replaceAll('/', '%2f');
								vscode.env.openExternal(vscode.Uri.parse(output, true));
							} else {
								if (config.workspaceRoot === '') {
									window.showErrorMessage('Please set the workspace root in the settings.');
								}
								if (config.workspaceSitePath === '') {
									window.showErrorMessage('Please set the workspace site path in the settings.');
								}
							}
						}
				}
			} else if (action == 'openFolderInRock') {
				if (target !== undefined) {
						const folders = vscode.workspace.workspaceFolders;
						if(!folders || folders.length === 0) {
							window.showInformationMessage('No workspace folder is open. Please open a workspace folder first.');
							throw new Error('No workspace folder is open. Please open a workspace folder first.');
						}

						if (folders.length === 1) {
							var path = target.path;
							// if path contains "rockweb"
							if (path.includes("RockWeb")) {
								path = path.split('RockWeb')[1].replaceAll('/', '%2f');
								let output = config.rockUrl + config.rockFileManagerPath + "?RelativeFilePath=~" + path;

								// get first file inside target folder
								let files = await workspace.fs.readDirectory(target);
								if (files.length > 0) {
									output = output + '%2f' + files[0][0];
									vscode.env.openExternal(vscode.Uri.parse(output, true));
									return;
								}

								window.showErrorMessage('Cannot open folder in Rock. Folder is empty.');
							}
						} else {
							if (config.workspaceRoot !== '' && config.workspaceSitePath !== '') {
								const workspaceRoot = String(config.workspaceRoot);
								const workspaceSitePath = String(config.workspaceSitePath).replaceAll('/', '%2f');
								const uri = folders?.find(folder => folder.name === workspaceRoot)?.uri;
								if (!uri) {
									throw new Error("Could not find Workspace Root folder.");
								}
								// get first file inside target folder
								let files = await workspace.fs.readDirectory(target);

								if (files.length > 0) {
									let firstFile = files[0][0];
									let output = config.rockUrl + config.rockFileManagerPath + "?RelativeFilePath=~%2f" + workspaceSitePath + target.path.replace(uri.path, '').replaceAll('/', '%2f') + '%2f' + firstFile;
									vscode.env.openExternal(vscode.Uri.parse(output, true));
								}
							} else {
								if (config.workspaceRoot === '') {
									window.showErrorMessage('Please set the workspace root in the settings.');
								}
								if (config.workspaceSitePath === '') {
									window.showErrorMessage('Please set the workspace site path in the settings.');
								}
							}
						}
				}
			} else if (action == 'copyTextToClipboard') {
				// Copy contents of the target to the clipboard
				if (target !== undefined) {
					let content : string | undefined = undefined;
					if (target.scheme === 'file') {
						try{
							const data = await workspace.fs.readFile(target);
							content = new TextDecoder("utf-8").decode(data);
						} catch {
							window.showErrorMessage('Could not read file.');
						}
					}

					if (content !== undefined) {
						vscode.env.clipboard.writeText(content);
						window.showInformationMessage('Copied to clipboard.');
						vscode.commands.executeCommand('triumphtech.rock-lava.openFileInRock', target);
						window.showInformationMessage('Launching Rock File Editor.');
					}
				}
			} else if (action == 'enableMenus') {
				vscode.workspace.getConfiguration("lava").update("showMenus", true, true);
			} else if (action == 'disableMenus') {
				vscode.workspace.getConfiguration("lava").update("showMenus", false, true);
			}
		});
		context.subscriptions.push(disposable);
	});
}
