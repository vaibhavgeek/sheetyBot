require("dotenv").config()
const request = require('request');
class telegram {
    
    send(chat_id, msg, cb) {
        const bot_token = process.env.telegram_bot_token;
        console.log(bot_token);
        const options = {
            url: `https://api.telegram.org/bot${bot_token}/sendMessage`,
            method: 'POST',
            timeout: 3000,
            json: {
                chat_id: chat_id,
                text: msg,
                parse_mode: 'Markdown',
            },
        }

        request(options, (err, res) => {
            if (err)
                return cb(err)

            if (typeof res === 'undefined')
                return cb(new Error(`Timeout Error. res object is ${res}`))
            else if (res.statusCode !== 200)
                return cb(new Error(`res code is ${res.statusCode}`))

            cb(null)
        })
    }

    notify(chat_id, item, cb) {
        const bot_token = process.env.telegram_bot_token;
       const msg = `Greetings from Sheety Chatbot, this your ${item["frequency"]} question, 
Question : *${item["question"]}*,
Your response will update cell _${item["responseCell"]}_ on worksheet _${item["sheetResponse"]}_.`;
 
        const options = {
            url: `https://api.telegram.org/bot${bot_token}/sendMessage`,
            method: 'POST',
            timeout: 6000,
            json: {
                chat_id: chat_id,
                text: msg,
                parse_mode: 'Markdown'
            },
        }

        request(options, (err, res) => {
            if (err)
                return cb(err)

            if (typeof res === 'undefined')
                return cb(new Error(`Timeout Error. res object is ${res}`))
            else if (res.statusCode !== 200)
                return cb(new Error(`res code is ${res.statusCode}`))

            cb(null)
        })
    }
    _format(name, info) {
        let str = `\`${name}\` sheet has been updated!!\n`
        return str
    }
}
module.exports = telegram
