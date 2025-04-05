// backup.js

import fs from 'fs/promises';
import path from 'path';
import { existsSync, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import cron from 'node-cron';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, 'backup-log.txt');

async function writeLog(message) {
  const timestamp = new Date().toISOString();
  await fs.appendFile(logFile, `[${timestamp}] ${message}\n`);
}

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function compressFolder(folderPath, outputPath) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

async function maintainBackupLimit(dest, maxBackups) {
  const backups = await fs.readdir(dest);
  const backupDirs = backups
    .filter(name => name.startsWith('backup-'))
    .map(name => ({ name, time: fs.stat(path.join(dest, name)).then(stat => stat.mtime) }));

  const sorted = (await Promise.all(backupDirs.map(async b => ({
    name: b.name,
    time: await b.time
  })))).sort((a, b) => a.time - b.time);

  while (sorted.length > maxBackups) {
    const toRemove = sorted.shift();
    await fs.rm(path.join(dest, toRemove.name), { recursive: true, force: true });
    await writeLog(`Deleted old backup: ${toRemove.name}`);
  }
}

async function runBackup(src, dest, maxBackups = 5, compress = false) {
  try {
    if (!existsSync(src)) {
      console.log('Source folder does not exist.');
      return;
    }

    const timestamp = getTimestamp();
    const backupFolderName = `backup-${timestamp}`;
    const tempBackupPath = path.join(dest, backupFolderName);

    await copyDir(src, tempBackupPath);

    if (compress) {
      const zipPath = `${tempBackupPath}.zip`;
      await compressFolder(tempBackupPath, zipPath);
      await fs.rm(tempBackupPath, { recursive: true, force: true });
      await writeLog(`Compressed and created backup: ${zipPath}`);
    } else {
      await writeLog(`Created backup folder: ${tempBackupPath}`);
    }

    await maintainBackupLimit(dest, maxBackups);
    console.log('Backup complete.');
  } catch (err) {
    console.error('Backup failed:', err.message);
    await writeLog(`Backup failed: ${err.message}`);
  }
}

async function main() {
  const { src, dest, mode, maxBackups, compress, schedule } = await inquirer.prompt([
    { name: 'src', message: 'Enter source directory:' },
    { name: 'dest', message: 'Enter backup destination directory:' },
    {
      name: 'mode',
      type: 'list',
      message: 'Backup mode:',
      choices: ['One-time', 'Scheduled']
    },
    { name: 'maxBackups', message: 'Maximum number of backups to keep:', default: 5 },
    { name: 'compress', type: 'confirm', message: 'Compress backups?', default: false },
    {
      name: 'schedule',
      message: 'Enter CRON expression (e.g., */1 * * * * for every minute):',
      when: answers => answers.mode === 'Scheduled'
    }
  ]);

  if (mode === 'One-time') {
    await runBackup(src, dest, Number(maxBackups), compress);
  } else {
    console.log('Scheduled backup started. Press Ctrl+C to stop.');
    cron.schedule(schedule, () => {
      runBackup(src, dest, Number(maxBackups), compress);
    });
  }
}

main();
