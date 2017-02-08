'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import * as helpers from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('Insert final newline', async () => {
        const document = await helpers.create(true);
        assert.strictEqual(await document.saveText('FooBar'), 'FooBar\n');
    });

    test('Do not insert final newline', async () => {
        const document = await helpers.create(false);
        assert.strictEqual(await document.saveText('FooBar'), 'FooBar');
    });

    test('Remove final newlines but keep only one', async () => {
        const document = await helpers.create(true);
        assert.strictEqual(await document.saveText('FooBar\n\n'), 'FooBar\n');
    });

    test('Do not remove final newlines', async () => {
        const document = await helpers.create(false);
        assert.strictEqual(await document.saveText('FooBar\n\n'), 'FooBar\n\n');
    });

    test('Do not remove empty lines', async () => {
        const document = await helpers.create(true);
        assert.strictEqual(await document.saveText('Foo\n\nBar\n\n'), 'Foo\n\nBar\n');
    });
});
