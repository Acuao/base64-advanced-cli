# base64-advanced-cli
This command line interface helps you to **encode/decode base64** data with advanced features like **files encoding/decoding** for example images and **jwt preview**.

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
                                         
                                         
base64-advanced-client v1.x.x
Usage: b64 [options]

Options:
  -d, --decode [data]           set mode to encoding
  -e, --encode [data]           set mode to decoding
  -i, --input-file <filename>   read input from a file
  -o, --output-file <filename>  write output to a file
  -v, --version                 display the version of this CLI
  --jwt <data>                  display the content of a jwt token
  --no-update-notification      do not display update notifications
  -h, --help                    display help for command
```

### Usage examples :

#### Encoding :
```
$ b64 -e "Hello World!"
```
Will return `SGVsbG8gV29ybGQh` value.

#### Decoding :

```
$ b64 -d SGVsbG8gV29ybGQh
```
Will return `Hello World!` value.

#### Writing output to a file :
```
$ b64 -d SGVsbG8gV29ybGQh -o decoded.txt
```

Will create a file named `decoded.txt` containingext " *Hello world!* " text, instead of displaying the output in the console.

#### Reading input from a file :
```
$ b64 -e -i decoded.txt
```
Will read file contents and encodode it, rather than using the command input.


#### JWT Preview :
This CLI provides a simple way to preview the content of JWT tokens.
```
$ b64 --jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk
```
will return the following output :
```
Header : {
    "alg": "HS256",
    "typ": "JWT"
}
Body : {
    "name": "John Doe",
    "iat": 1516239022
}
```
:warning: The CLI does **NOT** validate the signature of the token since this is not te purose of this tool.

##  :warning: Note
This library is still under development some changes may occur, great features incoming :muscle: