const db = require("./utils/db");
const sheet = require("./utils/sheet");
const telegram = require("./utils/telegram");

const notify = async function () {
  tel = new telegram();
  const allItems = await db.getAllSubscriber();
  for (const item in allItems["Items"]) {
    const itemRecord = allItems["Items"][item];
    const sheetId = itemRecord["sheetId"];
    console.log("sheetId", sheetId);
    if (sheetId !== undefined && await sheet.checkAccess(sheetId)) {
      const value = await sheet.checkToRespond(sheetId);
      if (value && value.length > 0 && itemRecord["platform"] === "telegram") {
        tel.notify(itemRecord["client"], value[0], (err) => {
        });
        const updated = await db.sendNotification(itemRecord["id"], value);
      }
    }
  }
};
// This is used for testing
(async function () {
  await notify();
})();

exports.handler = notify;
