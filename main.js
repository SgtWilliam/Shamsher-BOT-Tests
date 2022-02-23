const Discord = require('discord.js');
const discordClient = new Discord.Client();

const express = require('express')
const {response} = require("express");
const AutoRole = require("./src/BotModules/AutoRole");
const LiveNotification = require("./src/BotModules/LiveNotification");
const app = express()
const port = process.env.PORT || 5000;

const AUTH_TOKEN = process.env.SHAMSHER_TOKEN;


async function main() {
    discordClient.login(AUTH_TOKEN)
        .then(console.log)
        .catch(err => console.log(err.message))

    discordClient.on('ready', async () => {
        console.info(`Logged in as ${discordClient.user.tag}!`);

        AutoRole
            .init(discordClient)
            .then()
            .catch()

        LiveNotification
            .init(discordClient)
            .then()
            .catch()


    });


}

main().then()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


//hareguel hareflow
//ajsDJDSASDD HAII
