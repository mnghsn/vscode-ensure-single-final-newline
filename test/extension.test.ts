'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import { create, EOL } from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = true;', async () => {
        const document = await create(true, true);
        assert.strictEqual(await document.saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = false;', async () => {
        const document = await create(true, false);
        assert.strictEqual(await document.saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = true;', async () => {
        const document = await create(false, true);
        assert.strictEqual(await document.saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = false;', async () => {
        const document = await create(false, false);
        assert.strictEqual(await document.saveText('foo'), 'foo');
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = true;', async () => {
        const document = await create(true, true);
        assert.strictEqual(await document.saveText(`foo${EOL}${EOL}`), `foo${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = false;', async () => {
        const document = await create(true, false);
        assert.strictEqual(await document.saveText(`foo${EOL}${EOL}`), `foo${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = true;', async () => {
        const document = await create(false, true);
        assert.strictEqual(await document.saveText(`foo${EOL}${EOL}`), `foo${EOL}${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = false;', async () => {
        const document = await create(false, false);
        assert.strictEqual(await document.saveText(`foo${EOL}${EOL}`), `foo${EOL}${EOL}`);
    });

});
