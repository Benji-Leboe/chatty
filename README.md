# Chatty 

### Instant messaging app for week 6 @Lighthouse Labs

## Config

- Clone repo by running `git clone git@github.com:Benji-Leboe/chatty.git chatty` in desired directory
- Run `npm install` in root directory to install dependencies (including dev)
- Run `npm run socket`, then `npm start`

## Dependencies

- React
- Webpack
- Websockets
- Babel
- node-sass/sass-loader/css-loader
- uuid/v1
- Express.js
- Node.js

## Overview

Chatty is a React-based instant messaging application created for the week 6 project at Lighthouse Labs. Using websockets, it can send instant messaging data to any other clients using the application.

### Features

- Real-time instant messaging
- Can alter text using specific command codes
- Can post images/gifs and hyperlinks with optional aliases
- Randomly generated username colours that persist while in chat
- Can change username at any time (triggers an alert notification letting others know of the change)
- Displays number of active users