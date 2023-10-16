import { event, Events } from '../utils/index.js'

export default event(Events.MessageCreate, ({ log }, message) => {
    if(message.content === 'ping') {
        message.reply('pong');
    }
})
