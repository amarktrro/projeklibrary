/**
 * Usage: node generate-context.js
 * Output: project_context.txt
 */
const fs = require('fs');
const path = require('path');

// Configuration: Ignore these folders and files
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', '.vscode', 'dist', 'build', 'coverage']);
const IGNORE_FILES = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.DS_Store', '.env', '.env.local', 'generate-context.js']);
// Configuration: Only include these file extensions
const ALLOWED_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md', '.mjs', '.cjs']);

const OUTPUT_FILE = 'project_context.txt';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.has(file)) {
        results = results.concat(getFiles(filePath));
      }
    } else {
      if (!IGNORE_FILES.has(file) && ALLOWED_EXTS.has(path.extname(file))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

try {
  const rootDir = process.cwd();
  const files = getFiles(rootDir);
  
  let output = `Project Root: ${path.basename(rootDir)}\n\n`;
  
  // 1. Add File Structure
  output += "--- PROJECT STRUCTURE ---\n";
  files.forEach(file => {
    output += `${path.relative(rootDir, file)}\n`;
  });
  
  // 2. Add File Contents
  output += "\n--- FILE CONTENTS ---\n";
  files.forEach(file => {
    const relativePath = path.relative(rootDir, file);
    const content = fs.readFileSync(file, 'utf8');
    
    output += `\n================================================================================\n`;
    output += `File: ${relativePath}\n`;
    output += `================================================================================\n`;
    output += content + "\n";
  });

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`✅ Success! Context generated in '${OUTPUT_FILE}'.`);
  console.log(`You can now copy the content of '${OUTPUT_FILE}' and paste it into your AI.`);
} catch (error) {
  console.error("Error generating context:", error);
}
