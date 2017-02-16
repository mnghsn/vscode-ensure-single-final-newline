'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import {create, EOL} from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('Inserts a final newline when the file does not have one', async () => {
        const document = await create(true, true);
        assert.strictEqual(await document.saveText('FooBar'), `FooBar${EOL}`);
    });

    test('Does not insert newline when the file ends with one newline.', async () => {
        const document = await create(true, true);
        assert.strictEqual(await document.saveText(`FooBar${EOL}`), `FooBar${EOL}`);
    });

    test('Removes extra newlines at the end of the file', async () => {
        const document = await create(true, true);
        assert.strictEqual(await document.saveText(`FooBar${EOL}${EOL}`), `FooBar${EOL}`);
    });

    test('Do not removes extra newlines when `files.ensureSingleFinalNewline` is false', async () => {
        const document = await create(false, true);
        assert.strictEqual(await document.saveText(`FooBar${EOL}${EOL}`), `FooBar${EOL}${EOL}`);
    });

    test('Inserts a newline at the end of the file even `files.insertFinalNewline` is false', async () => {
        const document = await create(true, false);
        assert.strictEqual(await document.saveText(`FooBar`), `FooBar${EOL}`);
    });

    test('Removes extra newlines at the end of the file even `files.insertFinalNewline` is false', async () => {
        const document = await create(true, false);
        assert.strictEqual(await document.saveText(`FooBar${EOL}${EOL}`), `FooBar${EOL}`);
    });

    test('Inserts a final newline as long as `files.insertFinalNewline` is true', async () => {
        const document = await create(false, true);
        assert.strictEqual(await document.saveText('FooBar'), `FooBar${EOL}`);
    });

    test('Does not insert a final newline when both `files.insertFinalNewline` and `files.ensureSingleFinalNewline` are false', async () => {
        const document = await create(false, false);
        assert.strictEqual(await document.saveText('FooBar'), 'FooBar');
    });
});
