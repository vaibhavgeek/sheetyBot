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

const getItem = async function (telegram) {
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

const updateSubscriber = async function (id, item) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "set sheetId = :sid, client=:t",
    ExpressionAttributeValues: {
      ":t": item.client,
    },
  };
  return dynamoDb.update(params).promise();
};

const sendNotification = async function (id, pendingNotifications) {
  const params = {
    ...tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "set botsettings = :bots",
    ExpressionAttributeValues: {
      ":bots": pendingNotifications,
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
  };
  return dynamoDb.update(params).promise();
};

const getAllSubscriber = async function () {
  const queryParams = {
    ...tableName,
  };
  return dynamoDb.scan(queryParams).promise();
};

//This function is used to test the above code.

// (async function () {
//   //let item = {"name" : "hello world"}
//   //await newSubscriber(item);
//   console.log(await getAllSubscriber());

// })();

module.exports = {
  getItem,
  newSubscriber,
  getAllSubscriber,
  updateSubscriber,
  interactSubscriber,
  getSubscriber,
  sendNotification,
};
