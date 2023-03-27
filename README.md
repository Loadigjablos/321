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
2. If you haven't installed Node.js, then you need to install it. Link: https://nodejs.org/en/download
3. You have to install yarn. Here is the install link: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable
4. Start docker with "docker compose up -d" in the right Directory
5. Start "yarn" and then "yarn dev" in the right Directory
6. Open in browser: localhost:3000
## For tailwind css testing
npx tailwindcss -i ./client/CSS/style.css -o ./client/CSS/tailWind.css --watch
## BUGS
1. On connection to any group you have to restart page
2. Private group not funktion
3. After account deleting the user can work like a ghost up to 6 hours
### Errors
If you have any errors, make sure that the following points are met.
1. Node.JS The latest version is installed
2. The "npm install yarn" command has been run.
3. Before the launch of "docker compose up", all the leading containers were deleted and the MariaDB repository was deleted.
4. Run the command "yarn dev" or "npm run dev".
p.s. The launch of the program was tested on more than 10 devices, 5 of them were tested by other people.
