
## Sheety Chatbot! 

In this tutorial we are going to learn how to build a notification chatbot which sends you notifications at specific time intervals and talks to you if you want to receive them or not.

For the purpose of this tutorial we are going to build a bot which checks every 5 minutes on a google sheet if the person has marked his work or not and notifies specific **subscriber** on their telegram/slack/skype account if they have. Instead of a google sheet you can ping a website for changes. 

> subscriber - the user who has subscribed to the project via Telegram/Slack/Skype

We are going to use following stack for this purpose,

-   DynamoDB -  subscribers and habits
-   AWS Lambda -
	-   serverless functions which is invoked when chatbot gets a message.
	-   a cron job which notifies the user for an update
-   Claudia.js - Wrapper to write chatbot for slack, telegram and skype
-   Cloudwatch Rules - To trigger lambda function every 5 minutes

##  Architecture. 

Information pertaining to which cell to update upon which question would be stored in our google sheets file. 

In our database, we are going to have two tables - subscribers , sheetcells

Subscribers is going to have following columns, 
	- id
	- slackToken
	- slackId
	- telegramId
	- skypeId 
	- sheetId

Sheetcells is going to have following columns, 
    - cell 
    - value 
    - last checked 
    - type : enum [ "habit", "goal", "day" ]
    - subscriberId 
 
 
For our main infrastructure, we will have cloudwatch event calling our notification lambda function (called as notifyLambda), which will send the message to our user.  The conversations would be handled by separate lambda function which is called (