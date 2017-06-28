'use strict';

import * as utils from 'vscode-test-utils';
import * as assert from 'assert';
import { create, EOL } from './helpers';

suite('Ensure Single Final Newline', () => {
    suiteTeardown(utils.closeAllFiles);

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = true;', (done) => {
        create(true, true).saveText('foo').then(function (text) {
            assert.strictEqual(text, `foo${EOL}`);
        }).then(done);
    });

    test('no newline; ensureSingleFinalNewline = true; insertFinalNewline = false;', (done) => {
        create(true, false).saveText('foo').then(function (text) {
            assert.strictEqual(text, `foo${EOL}`);
        }).then(done);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = true;', (done) => {
        create(false, true).saveText('foo').then(function (text) {
            assert.strictEqual(text, `foo${EOL}`);
        }).then(done);
    });

    test('no newline; ensureSingleFinalNewline = false; insertFinalNewline = false;', (done) => {
        create(false, false).saveText('foo').then(function (text) {
            assert.strictEqual(text, 'foo');
        }).then(done);
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = true;', (done) => {
        create(true, true).saveText(`foo${EOL}${EOL}`).then(function (text) {
            assert.strictEqual(text, `foo${EOL}`);
        }).then(done);
    });

    test('2 newlines; ensureSingleFinalNewline = true; insertFinalNewline = false;', (done) => {
        create(true, false).saveText(`foo${EOL}${EOL}`).then(function (text) {
            assert.strictEqual(text, `foo${EOL}`);
        }).then(done);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = true;', (done) => {
        create(false, true).saveText(`foo${EOL}${EOL}`).then(function (text) {
            assert.strictEqual(text, `foo${EOL}${EOL}`);
        }).then(done);
    });

    test('2 newlines; ensureSingleFinalNewline = false; insertFinalNewline = false;', (done) => {
        create(false, false).saveText(`foo${EOL}${EOL}`).then(function (text) {
            assert.strictEqual(text, `foo${EOL}${EOL}`);
        }).then(done);
    });

});
