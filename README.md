# firefighter-robot-game-multiplayer
The multiplayer part of the Firefighter Robot game, from the HoRIzON project. The original game can be played [here](http://robot-isae.isae.fr).

Forked from [YoannH/PIR](https://github.com/YoannH/PIR). This is for a second-year research project at ISAE-Supaero. 

## Installation for Mac

#### Getting Node.js and Angular

Open a terminal and run the following commands:
```
brew install nodejs
sudo npm install -g npm@latest
sudo npm install -g angular@cli
```
This will first install Node.js via the Mac package manager `homebrew` and will install Angular with `npm`.

#### Setting up the server

Get the source files by cloning the repository with `git`, in the directory of your choice.
```
git clone https://github.com/Mdelage/firefighter-robot-game-multiplayer.git
```
Go into the directory, in `/firefighter-robot-game-multiplayer/server` with `cd` and type:
```
npm install .
node ./app.js
```
This will install the necessary packages for the server. The terminal should say that the server is now listening for requests.

Next, open another terminal, go into `/firefighter-robot-game-multiplayer/client` and type:
```
npm install .
ng serve
```
This will install the necessary packages for the client.

You can now access the server at http://localhost:4200/! For testing with two players, simply open two tabs at once.
