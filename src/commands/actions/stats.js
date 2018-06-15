import Promise from 'bluebird';

import { getUserAction } from '../../redis';


function userStatistics(client, evt, suffix) {
  if (evt.message.channel.isPrivate) return evt.message.channel.sendMessage('', false, {color: 3901635, description: `\u2139  Use this command in a server!`});
  let userToCheck;
  if (!suffix) userToCheck = evt.message.author;
  if (suffix && evt.message.mentions.length >= 0) userToCheck = evt.message.mentions[0];

  getUserAction(userToCheck.id)
  .then(results => {
    if (!results) return Promise.resolve(evt.message.channel.sendMessage('', false, {color: 16763981, description: `\u26A0 No data found for this user :( - Go give them a hug!`}));
    let embed = {
      color: 16737843,
      author: {
        name: `Action statistics for ${userToCheck.username}#${userToCheck.discriminator}`
      },
      fields: [
        { name: 'Fruits Eaten:',
          value: `\uD83C\uDF4E Apples: ${results.actions_foods_apple || 0} - \uD83C\uDF50 Pears: ${results.actions_foods_pear || 0} - \uD83C\uDF4A Tangerines: ${results.actions_foods_tangerine || 0}
\uD83C\uDF4C Bananas: ${results.actions_foods_banana || 0} - \uD83C\uDF49 Watermelons: ${results.actions_foods_watermelon || 0} - \uD83C\uDF53 Strawberries: ${results.actions_foods_strawberry || 0}
\uD83C\uDF51 Peaches: ${results.actions_foods_peach || 0} - \uD83C\uDF52 Cherries: ${results.actions_foods_cherry || 0} - \uD83C\uDF4D Pineapples: ${results.actions_foods_pineapple || 0}`,
          inline: false },
        { name: 'Meals Eaten:',
          value: `\uD83C\uDF54 Hamburgers: ${results.actions_foods_hamburger || 0} - \uD83C\uDF5F Fries: ${results.actions_foods_fries || 0} - \uD83C\uDF2E Tacos: ${results.actions_foods_taco || 0}
\uD83C\uDF63 Sushi: ${results.actions_foods_sushi || 0} - \uD83C\uDF5C Ramen: ${results.actions_foods_ramen || 0} - \uD83C\uDF72 Stew: ${results.actions_foods_stew || 0}
\uD83C\uDF5D Spaghetti: ${results.actions_foods_spaghetti || 0} - \uD83C\uDF5B Curries: ${results.actions_foods_curry || 0} - \uD83C\uDF55 Pizzas: ${results.actions_foods_pizza || 0}`,
          inline: false },
        { name: 'Insects Eaten:',
          value: `\uD83D\uDC1B Bugs: ${results.actions_foods_bug || 0} - \uD83D\uDC1E Beetles: ${results.actions_foods_beetle || 0} - \uD83D\uDD77 Spiders: ${results.actions_foods_spider || 0}`,
          inline: false },
        { name: 'Actions Received:',
          value: `<:hug:457179730333007874> Hugs: ${results.actions_hugs || 0} - <:kiss:457179730349654018> Kisses: ${results.actions_kisses || 0} - <:boop:457182422962929676> Boops: ${results.actions_boops || 0}
<:shoot:457179730525945856> Shots: ${results.actions_shots || 0} - <:dizzy:457184074336043028> Slaps: ${results.actions_slaps || 0} - <:pet:457178504442806292> Pets: ${results.actions_pets || 0}
<:lick:457179730626478080> Licks: ${results.actions_licks || 0} - <:bite:436215483230846976> Bites: ${results.actions_bites || 0} - \ud83d\udc4b Spanks: ${results.actions_spanks || 0}`,
          inline: false }
      ]
    };
    return Promise.resolve(evt.message.channel.sendMessage('', false, embed));
  });
  return Promise.resolve(true);
}

export default {
  actions: userStatistics,
  ustats: userStatistics
};

export const help = {
  actions: { parameters: '@User' }
};
