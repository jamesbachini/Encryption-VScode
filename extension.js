const vscode = require('vscode');
const CryptoJS = require("crypto-js");
 
/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
	const encryptFunc = vscode.commands.registerCommand('extension.encrypt', async () => {
		const fullText = vscode.window.activeTextEditor.document.getText()
		const passString = await vscode.window.showInputBox({ prompt: 'Provide your passphrase', placeHolder: 'My passphrase',	password: true, validateInput: value => (value.length == 0) ? "Passphrase cannot be empty" : null });
		const cipherText = CryptoJS.AES.encrypt(fullText, passString).toString();
		let wordWrapColumn = vscode.workspace.getConfiguration('editor').get('wordWrapColumn', false) || 80;
		const regex = new RegExp(`.{1,${wordWrapColumn}}`,"g");
		const cipherFormatted = cipherText.match(regex).join("\r\n");
		const invalidRange = new vscode.Range(0, 0, vscode.window.activeTextEditor.document.lineCount, 0);
		const fullRange = vscode.window.activeTextEditor.document.validateRange(invalidRange);
		vscode.window.activeTextEditor.edit(edit => edit.replace(fullRange, cipherFormatted));
		vscode.window.showInformationMessage(`File Encrypted`);
	});
	context.subscriptions.push(encryptFunc);

	const decryptFunc = vscode.commands.registerCommand('extension.decrypt', async () => {
		const fullText = vscode.window.activeTextEditor.document.getText();
		const cleanText = fullText.split("\r\n").join('');
		const passString = await vscode.window.showInputBox({ prompt: 'Provide your passphrase', placeHolder: 'My passphrase',	password: true, validateInput: value => (value.length == 0) ? "Passphrase cannot be empty" : null });
		const bytes  = CryptoJS.AES.decrypt(cleanText, passString);
		const plainText = bytes.toString(CryptoJS.enc.Utf8);
		const invalidRange = new vscode.Range(0, 0, vscode.window.activeTextEditor.document.lineCount, 0);
		const fullRange = vscode.window.activeTextEditor.document.validateRange(invalidRange);
		vscode.window.activeTextEditor.edit(edit => edit.replace(fullRange, plainText));
		vscode.window.showInformationMessage(`File Decrypted`);
	});
	context.subscriptions.push(decryptFunc);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
