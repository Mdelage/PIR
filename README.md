# firefighter-robot-game-multiplayer
The multiplayer part of the Firefighter Robot game, from the HoRIzON project. Forked from [YoannH/PIR](https://github.com/YoannH/PIR). This is for a second-year research project à ISAE-Supaero. 

## Installation for Mac

#### Getting Node.js and Angular

Open a terminal and run the following commands:
```
brew install nodejs
sudo npm install -g npm@latest
sudo npm install -g angular@cli
```
This will first install Node.js via the Mac package manager _Homebrew_ and will install Angular with _Node package manager_.

#### Setting up the server

Get the source files by cloning the repository with _Git_, in the directory of your choice.
```
git clone https://github.com/Mdelage/firefighter-robot-game-multiplayer.git
```
Go into the directory, in `/firefighter-robot-game-multiplayer/server` with `cd` and type:
```
node ./app.js &
```
The terminal should say that the server is now listening for requests.

Next, go into `/firefighter-robot-game-multiplayer/client` and type:
```
npm install .
ng serve &
```
This will install the necessary packages.

You can now access the server at http://localhost:4200/ !
