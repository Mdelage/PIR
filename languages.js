/* This file is used to manage the messages that will be displayed during the games. 
Three types exist for each game type:
0: normal
1: modified dialogues
2: No dialogue */

/* This is the basic messages object. The messages here are from last year project */
const messages0 = {

  english1 : () => { return "Go fill the water tank." },
  english2 : () => { return "I'm going to refuel my water." },
  english3 : () => { return "I need water." },
  english4 : () => { return "I need energy." },
  english5 : () => { return "Yes" },
  english6 : () => { return "No" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "Va remplir le réservoir d'eau." },
  french2 : () => { return "Je vais recharger mon eau." },
  french3 : () => { return "J'ai besoin d'eau." },
  french4 : () => { return "J'ai besoin d'énergie." },
  french5 : () => { return "Oui" },
  french6 : () => { return "Non" },
  french7 : () => { return "L'autre joueur veut vous donner de l'eau." },
  french8 : () => { return "L'autre joueur veut de l'eau." },
  french9 : () => { return "L'autre joueur veut vous donner de l'énergie." },
  french10 : () => { return "L'autre joueur veut de l'énergie." }
}
exports.messages0 = messages0;

/* The messages here are modified following an idea of pushing information
instead of pulling */
const messages1 = {

  english1 : () => { return "Go fill the water tank." },
  english2 : () => { return "I'm going to refuel my water." },
  english3 : () => { return "I need water." },
  english4 : () => { return "I need energy." },
  english5 : () => { return "Yes" },
  english6 : () => { return "No" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "Va remplir le réservoir d'eau." },
  french2 : () => { return "Je vais recharger mon eau." },
  french3 : () => { return "J'ai besoin d'eau." },
  french4 : () => { return "J'ai besoin d'énergie." },
  french5 : () => { return "Oui" },
  french6 : () => { return "Non" },
  french7 : () => { return "L'autre joueur veut vous donner de l'eau." },
  french8 : () => { return "L'autre joueur veut de l'eau." },
  french9 : () => { return "L'autre joueur veut vous donner de l'énergie." },
  french10 : () => { return "L'autre joueur veut de l'énergie." }
}
exports.messages1 = messages1;

/* The messages here correspond to game with no dialogue between the players possible */
const messages2 = {

  english1 : () => { return "Go fill the water tank." },
  english2 : () => { return "I'm going to refuel my water." },
  english3 : () => { return "I need water." },
  english4 : () => { return "I need energy." },
  english5 : () => { return "Yes" },
  english6 : () => { return "No" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "Va remplir le réservoir d'eau." },
  french2 : () => { return "Je vais recharger mon eau." },
  french3 : () => { return "J'ai besoin d'eau." },
  french4 : () => { return "J'ai besoin d'énergie." },
  french5 : () => { return "Oui" },
  french6 : () => { return "Non" },
  french7 : () => { return "L'autre joueur veut vous donner de l'eau." },
  french8 : () => { return "L'autre joueur veut de l'eau." },
  french9 : () => { return "L'autre joueur veut vous donner de l'énergie." },
  french10 : () => { return "L'autre joueur veut de l'énergie." }
}
exports.messages2 = messages2;
