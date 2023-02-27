var createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { json } = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
const botToken = process.env.TOKEN;
const webhookUrl = `https://e866-2405-201-f006-b014-223e-fbf1-812c-2511.in.ngrok.io/webhook`;

// Use bodyParser to parse incoming JSON payloads
app.use(bodyParser.json());

// Define a route for handling incoming webhook requests
app.post(`/${webhookUrl}`, (req, res) => {
  const update = req.body;
  console.log(update);
  res.sendStatus(200);
});

// Start the server
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Set up the webhook

axios
  .post(`https://api.telegram.org/bot${botToken}/setWebhook?remove`, {
    // url: webhookUrl,
    allowed_updates: ['message', 'edited_message', 'poll', 'document'],
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

app.post('/webhook', (req, res) => {
  const message = req.body.message;
  const text = message?.text;
  if (req.body.message) {
    console.log(message);
    return res.status(200).json(message);
  } else {
    return res.status(200).json(req.body.poll);
  }
});
module.exports = app;
