var creds = require("./google-creds.json");
let { google } = require("googleapis");

const { GoogleSpreadsheet } = require("google-spreadsheet");

const jwtClient = new google.auth.JWT(
  creds.client_email,
  null,
  creds.private_key,
  ["https://www.googleapis.com/auth/drive"],
  null
);

const sheets = google.sheets({ version: "v4", jwtClient });

const defaultSheetName = "botsettings";

const literalToEpoch = {
  Hourly: 3600 * 1000,
  Daily: 24 * 60 * 60 * 1000,
  Monthly: 30 * 24 * 60 * 60 * 1000,
  Weekly: 7 * 24 * 60 * 60 * 1000,
  "Bi-Weekly": 14 * 24 * 60 * 60 * 1000,
};

const updateLastActivity = async (sheetId, botsetting) => {
  try {
    const lastXY = "E" + botsetting["rowId"].toString();
    let d = new Date().getTime();
    if (botsetting["lastActivity"]) {
      d=botsetting["lastActivity"] + literalToEpoch[botsetting["frequency"]];
    }
    await saveResponse(sheetId, defaultSheetName, lastXY, d);
  } catch (e) {}
};
const checkToRespond = async (sheetId) => {
  try {
    const botsettings = await getBotSettings(sheetId);
    const returnBots = [];
    console.log("check from console", botsettings);
    botsettings.forEach(async function (botsetting, index) {
      if (
        botsetting["lastActivity"] === null ||
        botsetting["lastActivity"] + literalToEpoch[botsetting["frequency"]] <
          new Date().getTime()
      ) {
        returnBots.push(botsetting);
      }
    });
    return returnBots;
  } catch (e) {
    //
  }
};
const readCell = async (sheetName, sheetcell, sheetId) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName];
  await sheet.loadCells(sheetcell);
  const cell = sheet.getCellByA1(sheetcell);
  return cell.value;
};

const saveResponse = async (sheetId, sheetName, sheetcell, value) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName];
  await sheet.loadCells(sheetcell);
  const cell = sheet.getCellByA1(sheetcell);
  cell.value = value;
  await sheet.saveUpdatedCells();
  return cell.value;
};

const getBotSettings = async (sheetId) => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  try {
    const sheet = doc.sheetsByTitle["botsettings"];
    await sheet.loadCells("A3:E7");
    const getQuestions = [];
    for (var i = 3; i < 7; i++) {
      const cellXY = "A" + i.toString();
      const responseXY = "C" + i.toString();
      const sheetXY = "B" + i.toString();
      const frequencyXY = "D" + i.toString();
      const lastXY = "E" + i.toString();

      getQuestions.push({
        question: sheet.getCellByA1(cellXY).value,
        responseCell: sheet.getCellByA1(responseXY).value,
        sheetResponse: sheet.getCellByA1(sheetXY).value,
        frequency: sheet.getCellByA1(frequencyXY).value,
        lastActivity: sheet.getCellByA1(lastXY).value,
        rowId: i.toString(),
      });
    }
    return getQuestions;
  } catch (e) {
    return "something went wrong!";
  }
};

const renameSheet = async (sheetId, sheetIndex) => {
  try {
    const requests = [
      {
        updateSheetProperties: {
          properties: {
            sheetId: sheetIndex,
            title: "botsettings",
          },
          fields: "title",
        },
      },
    ];
    const rename = (
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: requests,
        },
        auth: jwtClient,
      })
    ).data;
    return rename;
  } catch (e) {
    return "unable to rename sheet";
  }
};

const checkAccess = async (sheetId) => {
  try {
    const response = (
      await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
        auth: jwtClient,
      })
    ).data;
    const workSheets = response.sheets;
    for (var i = 0; i < workSheets.length; i++) {
      let properties = workSheets[i].properties;
      let title = properties.title;
      if (title === "botsettings") {
        return false;
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return "No Access";
  }
};

const copySheet = async (sheetId) => {
  try {
    const response = (
      await sheets.spreadsheets.sheets.copyTo({
        spreadsheetId: "1P9wVeKcLDdp5-j_HSDXumMF1U_uzozU6SZQzwTgYXHM",
        sheetId: 0,
        resource: {
          destinationSpreadsheetId: sheetId,
        },
        auth: jwtClient,
      })
    ).data;
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};

(async function () {
  const testSheetId = "1gO2rH6waSDVyjJ_Fd3XczHCejLgkAz7-4XGbhzoXtBU";
  // const renameObject = await copySheet(testSheetId);
  //console.log(renameObject);
  // await renameSheet(testSheetId, renameObject["sheetId"]);
  // let botsettings = await getBotSettings(testSheetId);
  // console.log(botsettings);
  //   botsettings = await checkToRespond(testSheetId);
  // console.log("respond or not", botsettings);
  // console.log(await updateLastActivity(testSheetId,botsettings));

  //console.log(
  //  await getQuestions("1M7wrlPAYywMjaPH1xclmUI4o3xtFyd4mMYSHTyC6IgI")
  // );
  //  const response = console.log(JSON.stringify(await checkAccess(testSheetId), null, 4));
  //  console.log(response);
  //console.log(await checkAccess(testSheetId));
})();

module.exports = {
  copySheet,
  renameSheet,
  getBotSettings,
  checkToRespond,
  updateLastActivity,
  saveResponse,
  readCell,
  checkAccess,
};
