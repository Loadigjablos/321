const { executeSQL } = require("./main");

const createNewGroup = async (name, users) => {
    const groupChatName = "groupchat_" + name;

    const usersString = JSON.stringify(users);

    console.log(groupChatName, usersString);

    const newGroupChatQueryInsert = `INSERT INTO groupchats (id, users, name) VALUES (NULL, '${name}', '${usersString}');`;
  
    const newGroupChatQueryDB = `CREATE TABLE '${groupChatName}' (id INT NOT NULL AUTO_INCREMENT , user_name VARCHAR(255) NOT NULL , message TEXT NOT NULL , PRIMARY KEY (id))`;

    await executeSQL(newGroupChatQueryInsert);
    await executeSQL(newGroupChatQueryDB);
}

//createNewGroup("jeffry", ["hi", "james"]);

const deleteGroup = async (name) => {
    const groupChatName = "groupchat_" + name;

}

const getGroupMessages = async (user) => {
  const groups = `SELECT * FROM groups`;
  let allMessages = [];
  for (group in groups) {


    allMessages.push();
  }
  return allMessages;
  //const allMessages = await executeSQL(users);
}

const listAllGroups = async () => {

}
  
module.exports = { createNewGroup, getGroupMessages, deleteGroup, listAllGroups };
