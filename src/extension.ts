'use strict';

import {
    Disposable,
    ExtensionContext,
    Position,
    Range,
    TextDocumentWillSaveEvent,
    TextEdit,
    window,
    workspace,
    WorkspaceConfiguration
} from 'vscode';

export function activate(context: ExtensionContext) {
    const config = workspace.getConfiguration('files');
    const handler = new EnsureSingleFinalNewlineHandler(config);
    context.subscriptions.push(handler);

    window.showWarningMessage(
        '"vscode-ensure-single-final-newline" has been deprecated. ' +
        'Please use built-in settings `files.trimFinalNewlines` instead.'
    )
}

class EnsureSingleFinalNewlineHandler {
    private _disposable: Disposable;
    private _config: WorkspaceConfiguration;

    constructor(config) {
        const subscriptions: Disposable[] = [];

        this._config = config;

        workspace.onWillSaveTextDocument(this._onWillSaveTextDocument, this, subscriptions);
        workspace.onDidChangeConfiguration(this._onDidChangeConfiguration, this, subscriptions);

        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onWillSaveTextDocument(event: TextDocumentWillSaveEvent) {
        if (this._config.get('ensureSingleFinalNewline', false)) {
            const doc = event.document;
            const edits = [];

            for (let index = doc.lineCount - 1; index > 0; index--) {
                const prevLine = doc.lineAt(index - 1);
                const currentLine = doc.lineAt(index);
                if (currentLine.isEmptyOrWhitespace) {
                    if (prevLine.isEmptyOrWhitespace) {
                        edits.push(TextEdit.delete(new Range(index - 1, 0, index, 0)));
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            if (!this._config.get('insertFinalNewline', false)) {
                const lastLineIndex = doc.lineCount - 1;
                const lastLine = doc.lineAt(lastLineIndex);
                if (!lastLine.isEmptyOrWhitespace) {
                    const eol = this._config.get('eol', '\n');
                    edits.push(TextEdit.insert(new Position(lastLineIndex, lastLine.text.length), eol));
                }
            }

            event.waitUntil(Promise.resolve(edits));
        }
    }

    private _onDidChangeConfiguration() {
        this._config = workspace.getConfiguration('files');
    }
}
