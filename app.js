var createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { json } = require('express');
require('dotenv').config();
const app = express();

// Parse incoming request bodies
app.use(bodyParser.json());

const botToken = process.env.TOKEN;
const webhookUrl = `https://8fce-2401-4900-32e9-f8b1-f192-2add-476b-45b0.ap.ngrok.io/webhook`;

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
  .post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    url: webhookUrl,
    allowed_updates: ['callback_query', 'message', 'poll'],
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
app.post('/webhook', (req, res) => {
  console.log(res._events);
  res.sendStatus(200);
});
module.exports = app;
