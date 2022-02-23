const GUILD_ID = process.env.GUILD_ID;
const DEFAULT_ROLE_ID = process.env.DEFAULT_ROLE_ID;


const AutoRole = {

    async init(discordClient) {

        discordClient.on('message', async (message) => {
            if (isMemberJoin(message)) {
                addDefaultRole(message)
                    .then(console.log)
                    .catch(e => console.log(e.message))
            }
        });

    }
}

async function addDefaultRole(message) {

    const guild = message.author.client.guilds.cache.get(`${GUILD_ID}`)
    const role = guild.roles.cache.get(`${DEFAULT_ROLE_ID}`);

    const member = await guild.members.fetch(`${message.author.id}`)

    await member.roles.add(role);

    return `Default role added with success to ${member.user.tag}`

}

function isMemberJoin(msg) {
    return msg.type === "GUILD_MEMBER_JOIN";
}

module.exports = AutoRole
