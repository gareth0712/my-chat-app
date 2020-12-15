# my-chat-app

A simple TCP chat-server that accepts clients that connect to it over TCP. You can use `netcat` or `ncat` to connect to the server.

# Pre-requisite

1. You have Node and git installed
2. You have either `netcat` or `ncat` installed

# Install

## My-chat-app

1. Clone the project by executing `git clone https://github.com/gareth0712/my-chat-app.git`
2. `cd my-chat-app`
3. `npm install`

## Connection Client

### Mac user

`netcat` or `nc` in pre-installed in Terminal.

### Linux user

`netcat` or `nc` should also be pre-installed in Terminal. If not, run `apt update && apt install -y netcat`.

### Windows user

It is recommended to install `ncat` https://nmap.org/ncat/. After downloading the zip file, follow the steps below to complete the installation

1. Unzip the downloaded ncap zip file.
2. Go to directory with ncat.exe.
3. Open start menu and search for "Edit the System environment variables" -> Environment Variables.
4. For "System variables", scroll down to look for "Path".
5. Double click "Path", click "New" to add the directory where ncat.exe is placed or move ncat.exe to one of the path in "Path".

# Run my-chat-app

1. `cd my-chat-app`
2. `npm run prod`

# Connect to my-chat-app

## Using Netcat / nc as connection client

Run `netcat localhost 3000` to connect to my-chat-app

## Using ncat as connection client

1. Open Terminal, `cd` to the directory of ncat.exe if you haven't placed it to one of the environmental variables
2. Run `ncat localhost 3000` to connect to my-chat-app

# Test

1. Start my-chat-app by following the above guidelines.
2. Open another Terminal, `cd` to the my-chat-app directory and `npm run test`

# Development

1. `cd my-chat-app`
2. `npm run start`

# Licence

MIT License

Copyright (c) 2020 gareth0712

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
