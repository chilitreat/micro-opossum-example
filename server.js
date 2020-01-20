const { json } = require('micro')
const sleep = require('then-sleep')

var sleep_timer = 10

module.exports = async (req, res) => {
    if (sleep_timer > 1000) {
        sleep_timer = 10;
    }else{
        sleep_timer *= 10
    }
    await sleep(sleep_timer)
    console.log({sleep_timer})
    return `hello ${sleep_timer}`
}