const db = require("./utils/db");
const sheet = require("./utils/sheet");
const telegram = require("./utils/telegram");

const notify = async function () {
  tel = new telegram();
  const allItems = await db.getAllSubscriber();
  for (const item in allItems["Items"]) {
    const itemRecord = allItems["Items"][item];
    const sheetId = itemRecord["sheetId"];
    const value = await sheet.checkToRespond(sheetId);
    if (value && itemRecord["platform"] === "telegram") {
      const msg = `Greetings from Sheety Chatbot, this your ${value[0]["frequency"]} question, 
Question : *${value[0]["question"]}*,
Your response will update cell _${value[0]["responseCell"]}_ on worksheet _${value[0]["sheetResponse"]}_.`;
      tel.send(itemRecord["client"], msg, (err) => {
        console.log(err);
      });
      value.shift();
      const updated = await db.sendNotification(itemRecord["id"], value);
    }
  }
};

(async function () {
  await notify();
})();
