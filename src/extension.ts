// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import CompletionItemProvider from "./features/completionItemProvider";
import { Global } from "./global";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const global = new Global("global");
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(["feature", "gherkin"], new CompletionItemProvider(global), ".")
    );

    context.subscriptions.push(vscode.commands.registerCommand("gherkin-autocomplete.update", () => {
        global.updateCache();
    }));

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument( (document: vscode.TextDocument) => {
            global.updateCacheOfTextDocument(document.uri);
    }));

    global.updateCache();
}
