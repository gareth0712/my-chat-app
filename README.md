# my-chat-app

A simple TCP chat-server that accepts clients that connect to it over TCP. You can use `netcat` or `ncat` to connect to the server.

This chat server can do 5 things:

1. Broadcast messages from any client to all other connected clients (like how you would expect a chat room to work).
2. Upon connecting prompt the client for their nickname.

- This nickname is case-sensitive and must be unique on the server.
- If the nickname is already taken the server should tell the user to choose a new nickname.

3. Upon entering a valid nickname, the server should:

- send the last 10 lines of chat in the chat room,
- broadcast that the user has connected to the other clients
- send a list of users that are currently connected to the just-connected client.

4. Upon disconnecting, the server should:

- broadcast that the user has disconnected.

5. If the user is "@mentioned", meaning the message contains @theirnickname, a BEL ('\a') character should be sent to the client that is connected with that nickname.

Example Interaction:

```
< Welcome to my chat server! What is your nickname?
Peter
< You are connected with 3 other users: [Tammy, Betty, King]
< Retrieving lastest 3 messages in the chat server ...
< [03:36:08] <Tammy> Hi guys
< [03:36:13] <Tammy> How are you doing today
< [03:36:24] <King> Great!!
< [03:38:50] <Betty> Nice to meet you all
Nice to meet you too!
< [03:40:24] <Tammy> Glad to be here
```

# Pre-requisite

1. You have Node and git installed
2. You have either `netcat` or `ncat` installed

# Install dependencies

## My-chat-app

```
npm install
```

## Connection Client

### Mac user

`netcat` or `nc` in pre-installed in Terminal.

### Linux user

`netcat` or `nc` might have been pre-installed in Terminal. If not, run `apt update && apt install -y netcat`.

### Windows user

It is recommended to install `ncat` from https://nmap.org/ncat/. After downloading the zip file, follow the steps below to complete the installation

1. Unzip the downloaded ncap zip file.
2. Go to directory with ncat.exe.
3. Open start menu and search for "Edit the System environment variables" -> Environment Variables.
4. For "System variables", scroll down to look for "Path".
5. Double click "Path", click "New" to add the directory where ncat.exe is placed or move ncat.exe to one of the path in "Path".

# Run my-chat-app

```
npm run prod
```

# Connect to my-chat-app

### Using Netcat / nc as connection client

Run `netcat localhost 3000` to connect to my-chat-app

### Using ncat as connection client

1. Open Terminal, `cd` to the directory of ncat.exe if you haven't placed it to one of the environmental variables
2. Run `ncat localhost 3000` to connect to my-chat-app

# Docker

I created Dockerfile and added scripts in package.json to allow building docker image for my-chat-app and also run it in Docker container. If you have Docker installed, please try out this section!

## Docker for my-chat-app server

### Building Docker image

```
npm run docker-build
```

### Running my-chat-app in Docker container

#### For Mac/Linux,

```
npm run docker-start
```

#### For Windows,

```
npm run docker-start-win
```

### Running my-chat-app in Docker container in the background

#### For Mac/Linux,

```
npm run docker-start-bkg
```

#### For Windows,

```
npm run docker-start-bkg-win
```

### Stop and remove my-chat-app Docker container

```
npm run docker-stop
```

## [BETA] Docker for connection client, netcat

### Building Docker image

```
npm run docker-client-build
```

### Running netcat in Docker container

```
npm run docker-client-start
Cmd line: <local ip address or ip address of docker container of my-chat-app> 3000
```

To find out docker container ip address of my-chat-app, if you run `npm run docker-start` or `npm run docker-start-win`, the IP address will be shown like below

```
> my-chat-app@1.0.0 start
> nodemon server.js

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): _._
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Server is up and can be connected through 172.17.0.2:3000
```

# Logs

By default, logs are saved in `log` directory.

# Test

1. `npm install --dev`
2. `npm run test`

# Development

1. `npm install` if you haven't done it yet
2. `npm install --dev`
3. `npm run start`

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
