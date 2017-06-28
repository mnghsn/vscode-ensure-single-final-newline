'use strict';

import * as vscode from 'vscode';
import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import * as tempy from 'tempy';

export function create(
    ensureSingleFinalNewline: boolean = true,
    insertFinalNewline: boolean = true,
    file: string = tempy.file({ extension: 'txt' })
) {
    async function createDocument(filepath: string, content: string = '') {
        const filename = await utils.createFile(content, filepath);
        const document = await vscode.workspace.openTextDocument(filename);
        const config = vscode.workspace.getConfiguration('files');

        await config.update('ensureSingleFinalNewline', ensureSingleFinalNewline, true);
        await config.update('insertFinalNewline', insertFinalNewline, true);
        await vscode.window.showTextDocument(document);

        return document;
    }

    return {
        file,
        saveText(text: string) {
            return new Promise<string>(async resolve => {
                const document = await createDocument(file, '');
                vscode.workspace.onDidChangeTextDocument(document.save);
                vscode.workspace.onDidSaveTextDocument(savedDoc => {
                    assert.strictEqual(savedDoc.isDirty, false, 'dirty saved doc');
                    resolve(savedDoc.getText());
                });

                const edit = new vscode.WorkspaceEdit();
                edit.insert(document.uri, new vscode.Position(0, 0), text);
                assert.strictEqual(
                    await vscode.workspace.applyEdit(edit),
                    true,
                    'editor fails to apply edit'
                );
            });
        }
    };
}

export const EOL = vscode.workspace.getConfiguration('files').get('eol', '\n');
