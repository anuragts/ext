import * as vscode from "vscode";
import getDetails from "./getDetails";

export async function activate(context: vscode.ExtensionContext) {
  let hell = vscode.commands.registerCommand("new.fixError", async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("No active editor");
      return;
    }

    const lang = editor.document.languageId;

    const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);

    interface Diagnostic {
      message: string;
    }

    let err: Diagnostic[] = [];

    diagnostics.forEach((diagnostic) => {
      console.log(diagnostic.message);
      err.push({ message: diagnostic.message });
      console.log(err[0].message);
    });

    const res = await getDetails(err, lang); // pass err array to getDetails

    await vscode.window.showInformationMessage(`${res}`);
  });

  context.subscriptions.push(hell);
}

export function deactivate() {}
