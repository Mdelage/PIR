/* This file is used to manage the messages that will be displayed during the games. 
Three types exist for each game type:
0: pulling information
1: pushing information
2: No dialogue */

/* Last year project messages:
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
  french10 : () => { return "L'autre joueur veut de l'énergie." } */

/* The messages here push information instead of pulling it. */
const messages0 = {

  english1 : () => { return "I'm filling the water tank." },
  english2 : () => { return "I'm going to refuel my water." },
  english3 : () => { return "I need water." },
  english4 : () => { return "I need energy." },
  english5 : () => { return "Yes" },
  english6 : () => { return "No" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "Je vais remplir le réservoir." },
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

/* The messages here pull information instead of pushing it. */
const messages1 = {

  english1 : () => { return "Can you fill the water tank?" },
  english2 : () => { return "I'm going to refuel my water." },
  english3 : () => { return "Do you need water?" },
  english4 : () => { return "Do you need energy?" },
  english5 : () => { return "Yes" },
  english6 : () => { return "No" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "Peux-tu remplir le réservoir ?" },
  french2 : () => { return "Je vais recharger mon eau." },
  french3 : () => { return "As-tu besoin d'eau ?" },
  french4 : () => { return "As-tu besoin d'énergie ?" },
  french5 : () => { return "Oui" },
  french6 : () => { return "Non" },
  french7 : () => { return "L'autre joueur veut vous donner de l'eau." },
  french8 : () => { return "L'autre joueur veut de l'eau." },
  french9 : () => { return "L'autre joueur veut vous donner de l'énergie." },
  french10 : () => { return "L'autre joueur veut de l'énergie." }
}
exports.messages1 = messages1;

/* The messages here correspond to a game with no dialogue between the players possible */
const messages2 = {

  english1 : () => { return "" },
  english2 : () => { return "" },
  english3 : () => { return "" },
  english4 : () => { return "" },
  english5 : () => { return "" },
  english6 : () => { return "" },
  english7 : () => { return "The other player is trying to give you water." },
  english8 : () => { return "The other player wants water." },
  english9 : () => { return "The other player is trying to give you energy." },
  english10 : () => { return "The other player wants energy." },

  french1 : () => { return "" },
  french2 : () => { return "" },
  french3 : () => { return "" },
  french4 : () => { return "" },
  french5 : () => { return "" },
  french6 : () => { return "" },
  french7 : () => { return "L'autre joueur veut vous donner de l'eau." },
  french8 : () => { return "L'autre joueur veut de l'eau." },
  french9 : () => { return "L'autre joueur veut vous donner de l'énergie." },
  french10 : () => { return "L'autre joueur veut de l'énergie." }
}
exports.messages2 = messages2;
