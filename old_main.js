require('dotenv').config();
const {validate} = require('uuid');
const Discord = require('discord.js');
const DiscordCode = require("axie-brasil-club-models-migrations/database/models/discodCode");
const User = require("axie-brasil-club-models-migrations/database/models/user");
const bot = new Discord.Client();

const TOKEN = process.env.SHANSHER_TOKEN;


async function main() {
    bot.login(TOKEN).then(console.log);

    bot.on('ready', () => {
        console.info(`Logged in as ${bot.user.tag}!`);
    });

    bot.on('message', async (msg) => {
        if (msg.channel.type === 'dm') {

            const isOnServer = msg.author.client.guilds.cache.get(`854810037670772762`)
            if (!isOnServer) {
                await msg.author.send(`Não dê uma de espertinho. Consiga um convite do nosso discord primeiro!`)
                return
            }

            if (validate(msg.content)) {
                const discordCode = await findDiscordCode(msg.content)

                if (!discordCode) {
                    await msg.author.send(`Esse código não existe, bunda lisa!`)
                    return
                }
                discordCode.validated = true
                const user = await getUser(discordCode)
                if (user) {
                    user.discordId = msg.author.id
                    await user.save()
                    await discordCode.save()
                    await msg.author.send(`Atualizei seu disc bunda lanhada!`)
                }

            //foldase
            //foldase
            //foldase
            //ensinando as mulas

            }
        }

    });

}

async function findDiscordCode(uuid) {
    return await DiscordCode.findOne({where: {code: uuid}})
}

async function getUser(discordCode) {
    return await User.findOne({where: {id: discordCode.userId}})
}

main().then()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
