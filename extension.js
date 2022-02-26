const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
	let disposable = vscode.commands.registerCommand('search-blog-example.generateIgnoreFile', function () {
		if (vscode.workspace.workspaceFolders !== undefined) {
			let f = vscode.workspace.workspaceFolders[0].uri.fsPath;

			fs.closeSync(fs.openSync(f + '/.READMEIgnore', 'w'));
		}
		else{
			vscode.window.showErrorMessage('Could not execute command');
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('File Generated, View Docs');
	});

	let disposable1 = vscode.commands.registerCommand('search-blog-example.printFiles', function () {
		if (vscode.workspace.workspaceFolders !== undefined) {
			let f = vscode.workspace.workspaceFolders[0].uri.fsPath;

			// check for ignore file
			try{
				let ignore = fs.readFileSync(f + '/.READMEIgnore', 'utf-8');

				let ignoreDictionary = [];
				ignoreDictionary.push('JPG');
				ignoreDictionary.push('jpg');
				ignoreDictionary.push('Mp3');
				ignoreDictionary.push('mp3');
			}
			catch(err){
				console.log(err);
			}

			let arr = [];

			const getAllFiles = function (dirPath, arrayOfFiles) {
				let files = fs.readdirSync(dirPath)

				arrayOfFiles = arrayOfFiles || []

				files.forEach(function (file) {
					if (fs.statSync(dirPath + "/" + file).isDirectory() && file !== 'node_modules') {
						arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
					} else {
						arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
					}
				})

				return arrayOfFiles
			}

			arr = getAllFiles(f);

			console.log(arr);
			
			let message = `YOUR-EXTENSION: folder: ${wf} - ${f}`;

			vscode.window.showInformationMessage(message);
		}
		else {
			let message = "YOUR-EXTENSION: Working folder not found, open a folder an try again";

			vscode.window.showErrorMessage(message);
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
}

// A destractor
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
