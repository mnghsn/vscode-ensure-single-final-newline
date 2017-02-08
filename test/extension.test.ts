'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import {create, EOL} from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('Insert final newline', async () => {
        const document = await create(true);
        assert.strictEqual(await document.saveText('FooBar'), `FooBar${EOL}`);
    });

    test('Do not insert final newline', async () => {
        const document = await create(false);
        assert.strictEqual(await document.saveText('FooBar'), 'FooBar');
    });

    test('Remove final newlines but keep only one', async () => {
        const document = await create(true);
        assert.strictEqual(await document.saveText(`FooBar${EOL}${EOL}`), `FooBar${EOL}`);
    });

    test('Do not remove final newlines', async () => {
        const document = await create(false);
        assert.strictEqual(await document.saveText(`FooBar${EOL}${EOL}`), `FooBar${EOL}${EOL}`);
    });

    test('Do not remove empty lines', async () => {
        const document = await create(true);
        assert.strictEqual(await document.saveText(`Foo${EOL}${EOL}Bar${EOL}${EOL}`), `Foo${EOL}${EOL}Bar${EOL}`);
    });
});
