import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const structure = {
  src: {
    components: {
      "BookForm.jsx": "",
      "BookList.jsx": "",
    },
    pages: {
      "Home.jsx": "",
    },
    hooks: {
      "useBooks.js": "",
    },
    "App.jsx": "",
    "main.jsx": "",
  },
};

function removeStructure(basePath, obj) {
  for (const name in obj) {
    const targetPath = path.join(basePath, name);
    if (typeof obj[name] === "string") {
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
        console.log(`🗑️ Removed file: ${targetPath}`);
      }
    } else {
      // Recursively remove nested structure
      removeStructure(targetPath, obj[name]);
      // After children are deleted, remove the folder if it exists
      if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length === 0) {
        fs.rmdirSync(targetPath);
        console.log(`📁 Removed folder: ${targetPath}`);
      }
    }
  }
}

const srcPath = path.join(__dirname, "src");
removeStructure(srcPath, structure);

if (fs.existsSync(srcPath) && fs.readdirSync(srcPath).length === 0) {
  fs.rmdirSync(srcPath);
  console.log(`📦 Removed empty src/ folder`);
}

console.log("✅ Cleanup complete.");
