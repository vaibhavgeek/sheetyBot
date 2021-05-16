const telegramTemplate = require("claudia-bot-builder").telegramTemplate;
const util = require("util");
const sheet = require("./../utils/sheet.js");
const db = require("./../utils/db.js");
const msg = require("./../constants");

const createBot = async function (id, message) {
  var matches = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(message);

  if (matches === null || matches === undefined) return msg.STEP_1_ERROR;

  let sid = matches[1];
  let access = await sheet.checkAccess(sid);

  if (matches && access) {
    await db.updateSheet(id, sid);
    let workSheet = await sheet.copySheet(sid);
    await sheet.renameSheet(sid, workSheet["sheetId"]);
    return [
      msg.STEP_3,
      `Successfully created botsettings worksheet for, ${message}`,
      msg.STEP_4,
    ];
  } else if (!access) {
    return msg.STEP_2_ERROR;
  } else {
    return msg.STEP_2_ERROR;
  }
};

const notifyBotResponse = async function (id, message, itemRecord) {
  let botsettings = itemRecord.Attributes.botsettings;
  let responseNotification =
    "No more updates from the sheeet, at this point of time!";
  if (!botsettings || botsettings.length === 0) return msg.DEFAULT_MESSAGE;
  if (botsettings && botsettings.length > 0) {
    let botsetting = itemRecord.Attributes.botsettings[0];
    await sheet.saveResponse(
      itemRecord.Attributes.sheetId,
      botsetting.sheetResponse,
      botsetting.responseCell,
      message
    );
    await sheet.updateLastActivity(itemRecord.Attributes.sheetId, botsetting);
    botsettings.shift();
    await db.sendNotification(itemRecord.Attributes.id, botsettings);
  }

  if (botsettings && botsettings.length > 0) {
    let item = botsettings[0];
    responseNotification = `Greetings from Sheety Chatbot, this your ${item["frequency"]} question, 
Question : *${item["question"]}*,
Your response will update cell _${item["responseCell"]}_ on worksheet _${item["sheetResponse"]}_.`;

    return [
      new telegramTemplate.Text(`Updated Sheet!`).get(),
      new telegramTemplate.Text(responseNotification).get(),
    ];
  } else {
    return msg.MARKED_ALL;
  }
};

const telegramBot = async function (message, originalApiRequest) {
  let item = {
    platform: "telegram",
    client: message.sender.toString(),
    interact: 0,
  };
  let itemRecord = await db.getItem(item.client);
  itemRecord =
    itemRecord.Count === 0
      ? await db.newSubscriber(item)
      : await db.interactSubscriber(itemRecord.Items[0]["id"]);
  let id = itemRecord["Attributes"]["id"];

  switch (message.text) {
    case "/start":
      return [msg.WELCOME, msg.START_VIDEO, msg.STEP_1];
      break;
    case String(message.text.match(/^https:.*/)):
      return createBot(id, message.text);
      break;
    default:
      return notifyBotResponse(id, message.text, itemRecord);
  }
};

module.exports = telegramBot;

//This function is used to test the above code and flow

(async function () {
let message = {
sender: 545485074,
text:
"https://docs.google.com/spreadsheets/d/1FuUBXAmCs4aUpYlieyk07uJDIHqzyk9GOPOLtFoniXQ/edit#gid=1014883060",
originalRequest: {
update_id: 403385039,
message: {
message_id: 8,
from: {
id: 545485074,
is_bot: false,
first_name: "Vaibhav",
last_name: "Maheshwari",
username: "ayeayecapt3n",
language_code: "en",
},
chat: {
id: 545485074,
first_name: "Vaibhav",
last_name: "Maheshwari",
username: "ayeayecapt3n",
type: "private",
},
date: 1618821516,
text: "/start",
entities: [
{
offset: 0,
length: 6,
type: "bot_command",
},
],
},
},
type: "telegram",
};
const botResponse = await telegramBot(message, {});
console.log(botResponse);
})();
