const telegramTemplate = require("claudia-bot-builder").telegramTemplate;
const util = require("util");
const sheet = require("./../utils/sheet.js");
const db = require("./../utils/db.js");
const msg = require("./../constants");

const createBot = async function (id, message) {
  if (message.split("spreadsheets/d/").length > 1) {
    sid = message.split("spreadsheets/d/")[1].split("/")[0];
    await db.updateSheet(id, sid);
    let link = `https://www.docs.google.com/spreadsheets/d/${sid}/`;
    let workSheet = await sheet.copySheet(sid);
    if (!workSheet) return msg.STEP_2_ERROR;
    await sheet.renameSheet(sid, workSheet["sheetId"]);
    return [
      msg.STEP_3,
      `Successfully created botsettings sheet for, ${link}`,
      msg.STEP_4,
    ];
  } else {
    return "Please enter a valid Spreadsheet!";
  }
};

const notifyBotResponse = async function (id, message, itemRecord) {
  console.log(itemRecord.Attributes.botsettings);
  if (itemRecord.Attributes.botsettings.length > 0) {
    let botsetting = itemRecord.Attributes.botsettings[0];
    await sheet.saveResponse(itemRecord.Attributes.sheetId, botsetting.sheetResponse, botsetting.responseCell , message);
    await sheet.updateLastActivity(itemRecord.Attributes.sheetId, botsetting);    
    let responseNotification = "No more updates from the sheeet, at this point of time!";
    let botsettings = itemRecord.Attributes.botsettings;
    botsettings.shift();
    await db.sendNotification(itemRecord.Attributes.id, botsettings);
    if(itemRecord.Attributes.botsettings.length > 1){
      let item = botsettings[0];
      responseNotification = `Greetings from Sheety Chatbot, this your ${item["frequency"]} question, 
Question : *${item["question"]}*,
Your response will update cell _${item["responseCell"]}_ on worksheet _${item["sheetResponse"]}_.`;
    }
    return [`Updated ${botsetting.responseCell} on Sheet ${botsetting.sheetResponse}`, responseNotification];
  } else {
    return msg.DEFAULT_MESSAGE;
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

//This function is used to test the above code and flow

//(async function () {
  //let message = {
    //sender: 545485074,
    //text:
      //"Please save it to sheet",
    //originalRequest: {
      //update_id: 403385039,
      //message: {
        //message_id: 8,
        //from: {
          //id: 545485074,
          //is_bot: false,
          //first_name: "Vaibhav",
          //last_name: "Maheshwari",
          //username: "ayeayecapt3n",
          //language_code: "en",
        //},
        //chat: {
          //id: 545485074,
          //first_name: "Vaibhav",
          //last_name: "Maheshwari",
          //username: "ayeayecapt3n",
          //type: "private",
        //},
        //date: 1618821516,
        //text: "/start",
        //entities: [
          //{
            //offset: 0,
            //length: 6,
            //type: "bot_command",
          //},
        //],
      //},
    //},
    //type: "telegram",
  //};
  //const botResponse = await telegramBot(message, {});
  //console.log(botResponse);
//})();
module.exports = telegramBot;
