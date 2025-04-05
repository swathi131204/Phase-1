const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');
const { marked } = require('marked');

const baseDir = path.join(__dirname, 'notes');

async function ensureNotesFolder() {
  await fs.mkdir(baseDir, { recursive: true });
}

async function createNote() {
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Enter note title:' },
    { name: 'content', message: 'Enter note content (Markdown):' },
    { name: 'category', message: 'Enter category/folder:' },
  ]);

  const folderPath = path.join(baseDir, answers.category);
  await fs.mkdir(folderPath, { recursive: true });

  const filePath = path.join(folderPath, `${answers.title}.md`);
  await fs.writeFile(filePath, answers.content, 'utf-8');

  console.log('Note created successfully.');
}

async function listNotes() {
  const categories = await fs.readdir(baseDir);

  for (const category of categories) {
    const files = await fs.readdir(path.join(baseDir, category));
    console.log(`\nCategory: ${category}`);
    files.forEach(file => console.log(`  - ${file}`));
  }
}

async function viewNote() {
  const answers = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title (without .md):' },
  ]);

  const filePath = path.join(baseDir, answers.category, `${answers.title}.md`);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log('\nNote content:\n');
    console.log(marked(content));
  } catch (err) {
    console.log('Note not found.');
  }
}

async function editNote() {
  const answers = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title (without .md):' },
  ]);

  const filePath = path.join(baseDir, answers.category, `${answers.title}.md`);

  try {
    const oldContent = await fs.readFile(filePath, 'utf-8');
    const updated = await inquirer.prompt([
      { name: 'newContent', message: 'Update the content:', default: oldContent }
    ]);
    await fs.writeFile(filePath, updated.newContent, 'utf-8');
    console.log('Note updated.');
  } catch {
    console.log('Note not found.');
  }
}

async function deleteNote() {
  const answers = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title (without .md):' },
  ]);

  const filePath = path.join(baseDir, answers.category, `${answers.title}.md`);

  try {
    await fs.unlink(filePath);
    console.log('Note deleted.');
  } catch {
    console.log('Note not found.');
  }
}

async function searchNotes() {
  const { keyword } = await inquirer.prompt([
    { name: 'keyword', message: 'Enter keyword to search:' }
  ]);

  const categories = await fs.readdir(baseDir);
  let found = false;

  for (const category of categories) {
    const folder = path.join(baseDir, category);
    const files = await fs.readdir(folder);

    for (const file of files) {
      const filePath = path.join(folder, file);
      const content = await fs.readFile(filePath, 'utf-8');
      if (content.includes(keyword)) {
        console.log(`Found in: ${file} (Category: ${category})`);
        found = true;
      }
    }
  }

  if (!found) {
    console.log('No notes found with that keyword.');
  }
}


async function mainMenu() {
  await ensureNotesFolder();

  while (true) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'Choose an action:',
      choices: [
        'Create Note',
        'List Notes',
        'View Note',
        'Edit Note',
        'Delete Note',
        'Search Notes',
        'Exit'
      ]
    });

    if (action === 'Create Note') await createNote();
    else if (action === 'List Notes') await listNotes();
    else if (action === 'View Note') await viewNote();
    else if (action === 'Edit Note') await editNote();
    else if (action === 'Delete Note') await deleteNote();
    else if (action === 'Search Notes') await searchNotes();
    else break;
  }
}

mainMenu();
