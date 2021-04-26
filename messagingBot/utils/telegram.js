const request = require('request')

class telegram {
    
    send(chat_id, msg, cb) {
        const bot_token = process.env.telegram_bot_token;
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

    notify(chat_id, project_name, release_page, version_info, cb) {
        const bot_token = process.env.telegram_bot_token;
        const options = {
            url: `https://api.telegram.org/bot${bot_token}/sendMessage`,
            method: 'POST',
            timeout: 3000,
            json: {
                chat_id: chat_id,
                text: this._format(project_name, version_info),
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                    forceReply: [[{
                        text: 'Check it out!',
                        url: release_page
                    }]]
                })
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
        // info.forEach((item) => {
        //     str += `*${item.version}* released at ${item.date}\n`
        // })
        return str
    }
}
module.exports = telegram
