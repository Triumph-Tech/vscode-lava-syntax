const vscode = require('vscode');

async function getRockWeb(workspace) {
  const foundFiles = await workspace.findFiles('**/web.config');
  const argconfigDirs = foundFiles
    .map((file) => file.path.replace(/web\.config$/, ''));
  argconfigDirs.sort((a, b) => a.split('/').length - b.split('/').length);
  return argconfigDirs[0]; //pick the shortest number of segments (top of tree)
}

async function getConnectionStrings(workspace) {
  const rockWebPath = await getRockWeb(workspace);
  return `${rockWebPath}web.ConnectionStrings.config`;
}


function activate(context) {
	const actions = ['openconnectionstrings'];

	actions.forEach(action => {
		let disposable = vscode.commands.registerCommand(`rock-lava.${action}`, async () => {
			if (action == 'openconnectionstrings') {
				
				const connectionStringFile = await getConnectionStrings(vscode.workspace);

				try {
					await vscode.workspace.fs.stat(vscode.Uri.parse(connectionStringFile));
					vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(connectionStringFile));
				} catch {
					vscode.window.showInformationMessage(`Rock Connection Strings file does not exist. `);
				}
			}
		});
		context.subscriptions.push(disposable);
	});
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}