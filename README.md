# 321 BusidoChat | Short describing
This is a small application developed by Matvej Levantsou and Dominic Streit.
The launch is carried out using Docker.
## How to start
### Install docker
For install you have to install Docker or Docker descktop.
**Link to install**: https://docs.docker.com/desktop/install/windows-install/ 
### Pull the programm
Command to pull: git clone https://github.com/Loadigjablos/321.git
Also you can use visual studio to clone repo or download the programm as code.
### Start a programm
1. Open Your Terminal
2. You have to install yarn. Here is the install link: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable
3. Start docker with "docker compose up -d" in the right Directory
4. Start "yarn dev" in the right Directory
5. Open in browser: localhost:3000
## For tailwind css testing
npx tailwindcss -i ./client/CSS/style.css -o ./client/CSS/tailWind.css --watch
