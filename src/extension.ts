import * as vscode from "vscode";
import getDetails from "./getDetails";

export async function activate(context: vscode.ExtensionContext) {

  let hell = vscode.commands.registerCommand("new.fixError", async () => {

    const editor = vscode.window.activeTextEditor;

    if(!editor){
      vscode.window.showErrorMessage('No active editor')
      return;
    }

    const text = editor.document.getText(editor.selection);

    const lang = editor.document.languageId;
    
    console.log(lang);

    const res = await getDetails(text,lang);

    console.log(res);

    vscode.window.showInformationMessage(`response - ${res}`);
  });

  context.subscriptions.push(hell);
}

export function deactivate() {}
