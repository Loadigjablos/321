const { executeSQL } = require("./main");

const createNewGroup = async (name, users) => {
  const groupChatName = "groupchat_" + name;

  const usersString = JSON.stringify(users);

  const newGroupChatQueryInsert = `INSERT INTO groupchats (id, users, name) VALUES (NULL, '${usersString}', '${name}');`;

  const newGroupChatQueryDB = `CREATE TABLE ${groupChatName} (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    time VARCHAR(255),
    PRIMARY KEY (id)
  );`;

  await executeSQL(newGroupChatQueryInsert);
  await executeSQL(newGroupChatQueryDB);
};

const addNewMessageToGroupp = async (chatname, name, message, time) => {
  const groupChatName = "groupchat_" + chatname;
  const newGroupChatQueryInsert = `INSERT INTO ${groupChatName} (id, username, message, time) VALUES (NULL, '${name}', '${message}', '${time}');`;
  await executeSQL(newGroupChatQueryInsert);
};

const deleteGroup = async (name) => {
  const groupChatName = "groupchat_" + name;
};

const joinGroupp = async (user, groupName) => {
  // alter groupchats table with new user
};

const getGroupMessages = async (user) => {
  const groupsQuery = `SELECT * FROM groupchats`;
  const groups = await executeSQL(groupsQuery);

  let allMessages = [];

  groups.forEach(async function (group) {
    const databaseName = "groupchat_" + group.name;
    const query = `SELECT * FROM ${databaseName}`;

    JSON.parse(group.users).forEach(async function (chatMember) {
      if ((user == chatMember)) {
        const data = await executeSQL(query);
        const groupChatJSON = {
          name: group.name,
          members: group.users,
          messages: data,
        };
        console.log(groupChatJSON);

        allMessages.push(groupChatJSON);
      }
    });
  });
  return allMessages;
  //const allMessages = await executeSQL(users);
};

module.exports = {
  createNewGroup,
  getGroupMessages,
  deleteGroup,
  joinGroupp,
  addNewMessageToGroupp,
};
