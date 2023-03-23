const { executeSQL } = require("./main");

const createNewGroup = async (name, users) => {
  const groupChatName = "groupchat_" + name;

  const usersString = JSON.stringify(users);

  const newGroupChatQueryInsert = `INSERT INTO groupchats (id, users, name) VALUES (NULL, '${name}', '${usersString}');`;

  const newGroupChatQueryDB = `CREATE TABLE '${groupChatName}' (id INT NOT NULL AUTO_INCREMENT , username VARCHAR(255) NOT NULL , message TEXT NOT NULL , PRIMARY KEY (id))`;

  await executeSQL(newGroupChatQueryInsert);
  await executeSQL(newGroupChatQueryDB);
};

//createNewGroup("jeffry", ["hi", "james"]);

const deleteGroup = async (name) => {
  const groupChatName = "groupchat_" + name;
};

const joinGroupp = async (user, groupName) => {
  // alter groupchats table with new user
}

const getGroupMessages = async (user) => {
  const groups = `SELECT * FROM groups`;
  let allMessages = [];
  for (group in groups) {
    for (chatMember in JSON.parse(group.users)) {
      if ((user = chatMember)) {
        const databaseName = "groupchat_" + group.name;

        const query = `SELECT * FROM ${databaseName}`;
        const allMessagesFromThisGroup = await executeSQL(query);

        const groupChatJSON = {
          name: group.name,
          members: group.users,
          messages: allMessagesFromThisGroup,
        };

        allMessages.push(groupChatJSON);
      }
    }
  }
  return allMessages;
  //const allMessages = await executeSQL(users);
};

module.exports = {
  createNewGroup,
  getGroupMessages,
  deleteGroup,
  joinGroupp,
};
