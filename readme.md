# base64-advanced-cli
This command line interface helps you to **encode/decode base64** data with advanced features like **files encoding/decoding**

## Install

```
$ npm install --global base64-advanced-cli
```


## Usage

This CLI provides the following command : `b64`

```
Usage: b64 [options]

Options:
  -d, --decode [data]
  -e, --encode [data]
  -i, --input-file <filename>
  -o, --output-file <filename>
  -h, --help                    display help for command
```

### Usage examples :

**Encoding:**
```
$ b64 -e "Hello World!"
```
Will return `SGVsbG8gV29ybGQh` value.

**Decoding:**

```
$ b64 -d SGVsbG8gV29ybGQh
```
Will return `Hello World!` value.

**Writing output to a file:**
```
$ b64 -d SGVsbG8gV29ybGQh -o decoded.txt
```

Will create a file named `decoded.txt` containingext " *Hello world!* " text, instead of displaying the output in the console.

**Reading input from a file:**
```
$ b64 -e -i decoded.txt
```
Will read file contents and encodode it, rather than using the command input.

##  :warning: Note
This library is still under development some changes may occur, great features incoming :muscle: