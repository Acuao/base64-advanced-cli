# base64-advanced-cli
This command line interface helps you to **encode/decode base64** data with advanced features like **files encoding/decoding**

## Install

```
$ npm install --global base64-advanced-cli
```


... or just try it without installing it :
```
$ npx base64-advanced-cli -e "Hello World!"
```


## Usage

This CLI provides the following command : `b64`

```
88             ad8888ba,          ,d8    
88            8P'    "Y8        ,d888    
88           d8               ,d8" 88    
88,dPPYba,   88,dd888bb,    ,d8"   88    
88P'    "8a  88P'    `8b  ,d8"     88    
88       d8  88       d8  8888888888888  
88b,   ,a8"  88a     a8P           88    
8Y"Ybbd8"'    "Y88888P"            88    
                                         
                                         
base64-advanced-client
Usage: b64 [options]

Options:
  -d, --decode [data]           set mode to encoding
  -e, --encode [data]           set mode to decoding
  -i, --input-file <filename>   read input from a file
  -o, --output-file <filename>  write output to a file
  -h, --help                    display help for command
```

### Usage examples :

**Encoding :**
```
$ b64 -e "Hello World!"
```
Will return `SGVsbG8gV29ybGQh` value.

**Decoding :**

```
$ b64 -d SGVsbG8gV29ybGQh
```
Will return `Hello World!` value.

**Writing output to a file :**
```
$ b64 -d SGVsbG8gV29ybGQh -o decoded.txt
```

Will create a file named `decoded.txt` containingext " *Hello world!* " text, instead of displaying the output in the console.

**Reading input from a file :**
```
$ b64 -e -i decoded.txt
```
Will read file contents and encodode it, rather than using the command input.

##  :warning: Note
This library is still under development some changes may occur, great features incoming :muscle: