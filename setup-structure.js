import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const structure = {
  src: {
    components: {
      "BookForm.jsx": `// Book Form
const BookForm = () => {
  return <div>Book Form<div>;

export default BookForm
`,
      "BookList.jsx": `// Book List
const BookList = () => {
  return <div>Book List</div>
}

`,
    },
    pages: {
      "Home.jsx": `const Home = () => {
  return <div>Home</div>;
}; export default Home
`,
    },
    hooks: {
      "useBooks.js": `const useBooks = () => {
  const books = []
};

export default useBooks
`,
    },
    "App.jsx": `import Home from './pages/Home'

function App() {
  return <Home />;
}

export default App
`,
    "main.jsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`,
  },
};

function createStructure(basePath, obj) {
  for (const name in obj) {
    const fullPath = path.join(basePath, name);
    if (typeof obj[name] === "string") {
      fs.writeFileSync(fullPath, obj[name], "utf8");
      console.log("📄 Created:", fullPath);
    } else {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        console.log("📁 Created:", fullPath);
      }
      createStructure(fullPath, obj[name]);
    }
  }
}

createStructure(path.join(__dirname, 'src'), structure.src);
console.log("✅ Files created in ./src");
