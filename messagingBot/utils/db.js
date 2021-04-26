/* eslint-disable prefer-arrow-callback, import/no-extraneous-dependencies */
const AWS = require("aws-sdk");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const awsConfig = {
  accessKeyId: process.env.aws_key,
  accessSecretKey: process.env.aws_secret,
  region: "ap-south-1",
};
AWS.config.update(awsConfig);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = { TableName: "sheetybots" };

const getItem = async function (client) {
  const params = {
    ...tableName,
    IndexName: "client-index",
    KeyConditionExpression: "client = :client",
    ExpressionAttributeValues: {
      ":client": client,
    },
  };
  return dynamoDb.query(params).promise();
};


const newSubscriber = async function (item) {
  item["id"] = uuidv4();
  const params = {
    ...tableName,
    Item: item,
    ReturnValues: "ALL_OLD",
  };
  return dynamoDb.put(params).promise();
};

const getSubscriber = async function (id) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
  };
  return dynamoDb.get(params).promise();
};

const lastMessage = async function(id, message, from){
  const params = {
    ...tableName,
  Key: {
    id: id,
  },
  UpdateExpression: "set lastMessage = :message, lastFrom = :from",
  ExpressionAttributeValues: {
    ":message": message,
    ":from": from,
    },
  };
  return dynamoDb.update(params).promise();
};

const updateSheet = async function (id, sheetId) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "set sheetId = :sid",
    ExpressionAttributeValues: {
      ":sid": sheetId,
    },
    ReturnValues: "ALL_OLD",
  };
  return dynamoDb.update(params).promise();
};


const updateClient = async function (id, item) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "set platform = :pid,  client=:t",
    ExpressionAttributeValues: {
      ":t": item.client,
      ":pid": item.platform,
    },
    ReturnValues: "ALL_OLD",
  };
  return dynamoDb.update(params).promise();
};

const interactSubscriber = async function (id) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "set interact = interact + :val",
    ExpressionAttributeValues: {
      ":val": 1,
    },
    ReturnValues: "ALL_OLD",
  };
  return dynamoDb.update(params).promise();
};

const getAllSubscriber = async function () {
  const queryParams = {
    ...tableName,
  };
  return dynamoDb.scan(queryParams).promise();
};


//This function is used to test the above code and flow

// (async function () {
//   let item = {"platform" : "telegram", "client": "12345126789" , "interact": 0};
//   itemAWS = await getItem(item.client);
//   if(itemAWS.Count == 0)
//         await newSubscriber(item);

//   item = await getItem(item.client);
//   await updateSheet(item.Items[0]["id"] , "sheetIdMan!!");
//   await lastMessage(item.Items[0]["id"] , "last-message" , "bot");
//   await interactSubscriber(item.Items[0]["id"]);
//   item = await getItem("12345126789");

  
//   console.log(item);
  
//   //console.log("all items in database", await getAllSubscriber());
  

// })();


module.exports = {
  getItem,
  newSubscriber,
  getAllSubscriber,
  updateClient,
  lastMessage,
  interactSubscriber,
  getSubscriber,
  updateSheet,
};
