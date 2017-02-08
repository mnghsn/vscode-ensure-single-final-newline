# Ensure Single Final Newline for VSCode

[![Travis CI Build Status](https://img.shields.io/travis/jmlntw/vscode-ensure-single-final-newline.svg?label=travisci&maxAge=86400)](https://travis-ci.org/jmlntw/vscode-ensure-single-final-newline)
[![AppVeyor CI Build Status](https://img.shields.io/appveyor/ci/jmlntw/vscode-ensure-single-final-newline.svg?label=appveyor&maxAge=86400)](https://ci.appveyor.com/project/jmlntw/vscode-ensure-single-final-newline)
[![devDependencies Status](https://img.shields.io/david/dev/jmlntw/vscode-ensure-single-final-newline.svg?maxAge=86400)](https://david-dm.org/jmlntw/vscode-ensure-single-final-newline?type=dev)

This is a [Visual Studio Code](https://code.visualstudio.com/) extension that ensures all files end with a single new line.

## Features

This extension removes extra newlines at the end of the file but keeps only one when you save the file.

![Screenshot](images/screenshot.gif)

## Usage

Enable or disable by setting `files.insertFinalNewline` in VSCode configuration.

```json
{
  "files.insertFinalNewline": true
}
```

## License

Licensed under the [MIT License](LICENSE.md).
