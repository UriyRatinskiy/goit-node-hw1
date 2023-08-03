const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

// async function readFile() {
//   const data = await readFile(contactsPath, "utf8");
//   return JSON.parse(data);
// }

// function writeFile(data) {
//   return fs.writeFile(contactsPath, JSON.stringify(data));
// }

// TODO: задокументувати кожну функцію
async function listContacts() {
  //Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return !result ? null : result.contacts;
}

async function removeContact(contactId) {
  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);

  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  //Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = { id: crypto(name, email, phone) };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
