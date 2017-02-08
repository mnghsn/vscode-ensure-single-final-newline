'use strict';

import * as vscode from 'vscode';
import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import * as tempfile from 'tempfile';

export function create(insertFinalNewline: boolean = true, file: string = tempfile('.txt')) {
    async function createDocument(filepath: string, content: string = '') {
        const filename = await utils.createFile(content, filepath);
        const document = await vscode.workspace.openTextDocument(filename);
        const config = vscode.workspace.getConfiguration('files');

        await config.update('insertFinalNewline', insertFinalNewline, true);
        await vscode.window.showTextDocument(document);

        return document;
    }

    return {
        file,
        saveText: async (text: string) => {
            const document = await createDocument(file, '');
            const edit = new vscode.WorkspaceEdit();
            edit.insert(document.uri, new vscode.Position(0, 0), text);

            assert.strictEqual(
                await vscode.workspace.applyEdit(edit),
                true,
                'applies edit'
            );

            return await new Promise<string>(resolve => {
                vscode.workspace.onDidSaveTextDocument(saveDocument => {
                    resolve(saveDocument.getText());
                });

                document.save();
            });
        }
    };
}
