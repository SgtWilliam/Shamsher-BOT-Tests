const {ApiClient} = require('@twurple/api');
const {StaticAuthProvider} = require('@twurple/auth');

const clientId = process.env.TWITCH_CLIENT_ID
const accessToken = process.env.TWITCH_ACCESS_TOKEN

const authProvider = new StaticAuthProvider(clientId, accessToken);

const apiClient = new ApiClient({authProvider});


const TwitchRepository = {

    async isStreamOn(userName) {
        const user = await apiClient.users.getUserByName(userName);
        if (!user) {
            return false;
        }
        const stream = await user.getStream();
        return stream !== null;
    },

    async wasStartedAtMoreThan(minute, userName) {
        const user = await this.getUser(userName)
        const stream = await user.getStream();
        const streamStartDateInMilliseconds = stream.startDate.getTime()
        const dateNowInMilliseconds = new Date().getTime()
        const diffDates = dateNowInMilliseconds - streamStartDateInMilliseconds
        return diffDates > minute * 60 * 1000;
    },

    async getUser(userName) {
        return await apiClient.users.getUserByName(userName);
    },

    async getStream(user) {
        return user.getStream();
    },

}

module.exports = TwitchRepository


// TwitchRepository
//     .wasStartedAtMoreThan(1, `roy_dino`)
//     .then(console.log)
//     .catch(reason => console.log(reason.message))
//
// TwitchRepository
//     .getUser(`roy_dino`)
//     .then(user => console.log(user.displayName))
//     .catch(reason => console.log(reason.message))

