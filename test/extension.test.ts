'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import { create, EOL } from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = true;', async () => {
        assert.strictEqual(await create(true, true).saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = false;', async () => {
        const document = await create(true, false);
        assert.strictEqual(await create(true, false).saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = true;', async () => {
        assert.strictEqual(await create(false, true).saveText('foo'), `foo${EOL}`);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = false;', async () => {
        assert.strictEqual(await create(false, false).saveText('foo'), 'foo');
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = true;', async () => {
        assert.strictEqual(await create(true, true).saveText(`foo${EOL}${EOL}`), `foo${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = false;', async () => {
        assert.strictEqual(await create(true, false).saveText(`foo${EOL}${EOL}`), `foo${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = true;', async () => {
        assert.strictEqual(await create(false, true).saveText(`foo${EOL}${EOL}`), `foo${EOL}${EOL}`);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = false;', async () => {
        assert.strictEqual(await create(false, false).saveText(`foo${EOL}${EOL}`), `foo${EOL}${EOL}`);
    });

});
