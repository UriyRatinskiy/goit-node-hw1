const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function readFile() {
  const data = await readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function writeFile(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  //Повертає масив контактів.
  const data = await readFile(contactsPath, "utf8");
  return data;
}

async function getContactById(contactId) {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await readFile(contactId, "utf8");
  return data.find((contact) => contact.id === id);
}

async function removeContact(contactId) {
  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const data = await readFile();

  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [...data.slice(0, index), ...data.sliae(index + 1)];

  await writeFile(newContacts);

  return "Success";
}

function addContact(name, email, phone) {
  //Повертає об'єкт доданого контакту.
}
