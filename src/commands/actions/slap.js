import Promise from 'bluebird';

import { setUserAction } from '../../redis';


function slap(client, evt) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139 Use this command in a server!`});

  let receiverArray = [];

  if (evt.message.mentions.length !== 0) {
    evt.message.mentions.map(user => {
      let guildUser = user.memberOf(evt.message.guild);
      if (user !== evt.message.author && !user.bot) receiverArray.push(guildUser.name);
    });

    if (receiverArray.length !== 0) {
      let receivers = receiverArray.join(' and ');

      const slaps = [
        `slaps ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `smacked ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `just slapped ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `walks up to ${receivers} and slaps them in the face :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `bitch slaps ${receivers}! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `smacks ${receivers} hard, ouch! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `beats some sense into ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `sends out slaps to ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `slaps ${receivers} hard, leaving a red mark! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `slappity slap slap slaps ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `gives ${receivers} a real good slappin'! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `whacks ${receivers} real good! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `do the slappy to ${receivers} :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`,
        `SLAP FIGHT! ${receivers}, get ready to get SLAPPED! :dizzy_face:\uD83D\uDC4B\uD83C\uDFFC`
      ];

      const rand = Math.floor(Math.random() * slaps.length);

      evt.message.mentions.map(user => {
        if (user !== evt.message.author) {
          return setUserAction(user.id, 'actions_slaps');
        }
      });

      return Promise.resolve(evt.message.member.name + ` ${slaps[rand]}`);
    }
  }
  return Promise.resolve(evt.message.member.name + ` slaps themselves..?`);
}

export default {
  slap
};

export const help = {
  slap: { parameters: '@User' }
};
