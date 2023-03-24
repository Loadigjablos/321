const { executeSQL } = require("./main");

const createNewGroup = async (name, users) => {
  try {
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
  } catch (e) {
    console.log(e);
    return null;
  }
};

const addNewMessageToGroupp = async (chatname, name, message, time) => {
  try {
    const groupChatName = "groupchat_" + chatname;
    const newGroupChatQueryInsert = `INSERT INTO ${groupChatName} (id, username, message, time) VALUES (NULL, '${name}', '${message}', '${time}');`;
    await executeSQL(newGroupChatQueryInsert);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const deleteGroup = async (name) => {
  try {
    const query = `DELETE FROM groupchats WHERE name = '${name}'`;
    await executeSQL(query);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const joinGroupp = async (user, groupName) => {
  try {
    const querySelect = `SELECT users FROM groupchats WHERE name = '${groupName}'`;
    const result = await executeSQL(querySelect);

    let newThing = JSON.parse(result[0].users);
    newThing.push(user);

    const queryUpdate = `UPDATE groupchats SET users = '${JSON.stringify(
      newThing
    )}' WHERE name = '${groupName}'`;
    await executeSQL(queryUpdate);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getGroupMessages = async (user) => {
  try {
    const groupsQuery = `SELECT * FROM groupchats`;
    const groups = await executeSQL(groupsQuery);
    let allMessages = [];
    for (let i = 0; i < groups.length; i++) {
      if(groups[i].users.includes(user)) {
        let databaseName = "groupchat_" + groups[i].name;
        let query = `SELECT * FROM ${databaseName}`;
        const data = await executeSQL(query);
        let groupChatJSON = {
          name: groups[i].name,
          members: groups[i].users.replace(/['"]+/g, '').replace(/[\[\]']+/g,'').split(','),
          messages: data,
        };
        allMessages.push(groupChatJSON);
      }
    }
    /*for (let group of groups) {
      const databaseName = "groupchat_" + group.name;
      const query = `SELECT * FROM ${databaseName}`;

      for (let chatMember of JSON.parse(group.users)) {
        if (user == chatMember) {
          const data = await executeSQL(query);
          let groupChatJSON = {
            name: group.name,
            members: JSON.parse(group.users),
            messages: data,
          };
          allMessages.push(groupChatJSON);
        }
      }
    }*/
    return allMessages;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  createNewGroup,
  getGroupMessages,
  deleteGroup,
  joinGroupp,
  addNewMessageToGroupp,
};
