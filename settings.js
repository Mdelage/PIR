/* This file is used to change the various game parameters. */

// The lenght of a game
const gameTime = 300;
exports.gameTime = gameTime;

// The amount of time players wait in the lobby
const waitingTime = 15;
exports.waitingTime = waitingTime;

/* Settings related to the water tank */
const water = {
  // The absolute max speed of the faucet
  faucetMaxSpeed : 3,
  // The acceleration of the faucet when manipulating it
  faucetAcceleration : 0.5,
  // The natural decceleration of the faucet
  faucetDecceleration : 0.1,
  // The starting amount of water in the tank
  waterLevelContainer : 50,
  /* Settings related to the geometry of the robinet */
  xRobinet : 42,
  coeffSpeed : 20,
  faucetXAxis : 2 * 10 / 40,
  yRobinet : 0,
  coeffXRob : 10,
  constXRob : 50,
}
exports.water = water;

// The max temperature the robots can sustained
const temperatureMax = 1000; // Default: 1000
exports.temperatureMax = temperatureMax;

// The time step
const timeStep = 0.02;
exports.timeStep = timeStep;

// The number of different places where leaks can appear
const leakPlacesNb = 9;
exports.leakPlacesNb = 9;

/* Settings related to the speeder robot */
const speeder = {
  // The name of the robot
  role : 'speeder',
  // Starting position and rotation
  pos : [75, 60, Math.PI],
  // Max amount of water it can hold
  maxWaterLevel : 30,
  // Starting amount of water
  waterLevel : 30,
  // Max amount of energy
  maxBatteryLevel : 50,
  // Speed
  transSpeed : 20,
  // Rotational speed
  rotSpeed : 1,
  // Starting directions of the robot. It's not moving, so the values are 0.
  direction : 0,
  rotDirection : 0,
  // Starting score
  personnalScore : 0 
}
exports.speeder = speeder;

/* Settings related to the tanker robot */
const tanker = {
  // The name of the robot
  role : 'tanker',
  // Starting position and rotation
  pos : [75, 40, Math.PI],
  // Max amount of water it can hold
  maxWaterLevel : 100,
  // Starting amount of water
  waterLevel : 50,
  // Max amount of energy
  maxBatteryLevel : 100,
  // Speed
  transSpeed : 15,
  // Rotational speed
  rotSpeed : 0.7,
  // Starting directions of the robot. It's not moving, so the values are 0.
  direction : 0,
  rotDirection : 0,
  // Starting score
  personnalScore : 0 
}
exports.tanker = tanker;