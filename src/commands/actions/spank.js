import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function spank(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  var chars = { '*': '\\*', _: '\\_', '~': '\\~' };
  let authorName = evt.message.author.username.replace(/[*_~]/g, m => chars[m]);

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let receiverName = user.username.replace(/[*_~]/g, m => chars[m]);
      if (user !== evt.message.author && !user.bot) receiverArray.push(`**${receiverName}**`);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const spanks = [
        `gives ${receivers} a smol spanking! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a spank! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} softly! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} gently! \ud83d\udc4b\ud83c\udf51`,
        `turns around and spanks ${receivers}! \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a firm spanking! \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a hard spanking! \ud83d\udc4b\ud83c\udf51`,
        `seems to think you've been bad, ${receivers}, so he walks up to you and spanks you! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} several times! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} until red marks appear! \ud83d\udc4b\ud83c\udf51`
      ];

      const rand = Math.floor(Math.random() * spanks.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_spanks');
        }
      });

      return Promise.resolve(`**${authorName}** ${spanks[rand]}`);
    }
  }
  return Promise.resolve(`**${authorName}** spanks their own butt! \ud83d\udc4b\ud83c\udf51`);
}

export default {
  spank
};

export const help = {
  spank: { parameters: '@User' }
};
