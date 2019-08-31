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
		const invalidRange = new vscode.Range(0, 0, vscode.window.activeTextEditor.document.lineCount, 0);
		const fullRange = vscode.window.activeTextEditor.document.validateRange(invalidRange);
		vscode.window.activeTextEditor.edit(edit => edit.replace(fullRange, cipherText));
		vscode.window.showInformationMessage(`File Encrypted`);
	});
	context.subscriptions.push(encryptFunc);

	const decryptFunc = vscode.commands.registerCommand('extension.decrypt', async () => {
		const fullText = vscode.window.activeTextEditor.document.getText()
		const passString = await vscode.window.showInputBox({ prompt: 'Provide your passphrase', placeHolder: 'My passphrase',	password: true, validateInput: value => (value.length == 0) ? "Passphrase cannot be empty" : null });
		const bytes  = CryptoJS.AES.decrypt(fullText, passString);
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
