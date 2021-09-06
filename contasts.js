const { table } = require('node:console');
const fs = require('node:fs/promises');
const path = require('node:path');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');



async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const getContact = contacts.find(item => item.id === Number(contactId));

    if (!getContact) {
      return console.log(`Contact with id=${contactId} dont exist in db`)
    }
    console.table(getContact);
    return getContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const indexContact = contacts.findIndex(item => item.id === Number(contactId));
    if (indexContact === -1) {
      return console.log(`Contact with id=${contactId} can't be deleted `);
    }
    const newContacts = contacts.filter(item => item.id !== Number(contactId));
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    console.table(newContacts);
    return contacts[indexContact];
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
     const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const checkId = id => contacts.some(item => item.id === id) ? checkId(id + 1) : id;

    const add = { name, email, phone };
    const newContact = { id: checkId(contacts.length), ...add };
    contacts.push(newContact);

    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    console.table(contacts);
    console.table(newContact);
    return newContact; 
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};