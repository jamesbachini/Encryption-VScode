# Encryption Visual Studio Code Plugin README

This plugin adds two functions encrypt and decrypt which uses AES Encryption to secure your data.

It operates on the current document and replaces the text.

`CTRL + SHIFT + P` > Type "Encrypt" or "Decrypt" > Enter a pass phrase > current document will be encrypted/decrypted.

NOTE: IF YOU HAVE NON-UTF8 SPECIAL CHARACTERS IN THE DOCUMENT YOU WILL GET MALFORMED UTF8 ERRORS

## Blog Post
https://jamesbachini.com/how-to-encrypt-text-in-visual-studio-code-vscode/

## Repository
https://github.com/jamesbachini/Encryption-VScode

## Build Instructions
```shell
npm install
npx vsce package
npx vsce publish
```


## Release Notes

Latest release: 1.0.2


### 1.0.2

Added line breaks at wordWrapColumn setting length

### 1.0.0

Encryption v1.0.0 initial release
AES passphrase encryption
Uses current document as input data and overwrites

## Known Issues

If the document has non-utf8 characters in it then it breaks Javascripts AES encryption causing the process to fail.

None

### Links

* [Visual Studio Code](https://visualstudio.com)

* [James Bachini](https://jamesbachini.com)

* [Github](https://github.com/jamesbachini)



