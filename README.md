# REST API endpoint for the SnapEngage API with some  custom visualization.
The API endpoint prototype with some data visualization for the SnapEngage chat API.

## Config
Before start you need to put a corresponding SnapEngage API key to _public/chat.js_ and _config.json_ files.

### Install
```bash
npm install
```

### Start Mondodb
```bash
mkdir db
mongod --dbpath ./db
```

### To run
```bash
npm start
```

### To run in debug mode
```bash
npm run debug
```