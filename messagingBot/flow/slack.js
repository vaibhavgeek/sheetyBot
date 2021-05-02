const telegramTemplate = require("claudia-bot-builder").telegramTemplate;

const sheet = require("./../utils/sheet.js");
const db = require("./../utils/db.js");
const msg = require("./../constants");


const slackBot = async function (message, originalApiRequest) {
  switch(message.text){
  case "/start":
      return msg.WELCOME;
  }


};
module.exports = slackBot;