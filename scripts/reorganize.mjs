import fs from 'fs';
import path from 'path';

const baseDir = '/vercel/share/v0-project';
const vatfakturaDir = path.join(baseDir, 'vatfaktura');

// Directories to move
const directories = ['app', 'components', 'hooks', 'lib', 'styles'];

// Files to move
const files = ['README.md', 'API.md'];

// Move directories
for (const dir of directories) {
  const source = path.join(vatfakturaDir, dir);
  const destination = path.join(baseDir, dir);
  
  if (fs.existsSync(source)) {
    console.log(`Moving ${dir}...`);
    fs.renameSync(source, destination);
  }
}

// Move files
for (const file of files) {
  const source = path.join(vatfakturaDir, file);
  const destination = path.join(baseDir, file);
  
  if (fs.existsSync(source) && !fs.existsSync(destination)) {
    console.log(`Moving ${file}...`);
    fs.renameSync(source, destination);
  }
}

// Remove empty vatfaktura directory
if (fs.existsSync(vatfakturaDir) && fs.readdirSync(vatfakturaDir).length === 0) {
  fs.rmdirSync(vatfakturaDir);
  console.log('Removed empty vatfaktura directory');
}

console.log('Project structure reorganization complete!');
