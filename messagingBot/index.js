var botBuilder = require("claudia-bot-builder");
var telegramFlow = require("./flow/telegram");
var slackFlow = require("./flow/slack");

const bot = botBuilder(async (message, originalApiRequest) => {
    if(message.type === 'telegram')
      return await telegramFlow(message, originalApiRequest);
    else if(message.type === 'slack')
      return await slackFlow(message, originalApiRequest);
});

module.exports = bot;
