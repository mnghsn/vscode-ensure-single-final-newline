# Ensure Single Final Newline for VSCode

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
