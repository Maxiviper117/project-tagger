# Project Tagger 🚀

A lightweight CLI tool that simplifies project organization through a tag-based system. Create and manage project tags to efficiently categorize your projects.

## How It Works 🔍

**Project Tagger** creates `.project.tag` files in a hidden `.tags` directory within your project root. These `.project.tag` files act as searchable markers, making it easier to find and filter projects across your filesystem using tools like `fzf` or `Everything`.

### Example

If you add `react.project.tag` to a React project, you can later search for `react.project.tag` to quickly locate all your React projects.

---

## Installation 📦

### NPM Global Installation
```bash
npm install -g project-tagger
```

### Direct Usage with npx
```bash
npx project-tagger
```

---

## Usage 🚀

1. **Navigate to Your Project Root:**
   ```bash
   cd /path/to/your/project
   ```

2. **Run Project Tagger:**
   ```bash
   project-tagger
   ```

### CLI Menu Options

- **✨ Add Tag**  
  Add custom tags to your project. Spaces in tag names are replaced with underscores.

- **📋 List Tags**  
  View all existing tags in the `.tags` directory.

- **❌ Remove Tag**  
  Select specific tags to remove.

- **🧹 Clear All Tags**  
  Remove all tags from the current project at once.

- **🔍 Detect Project Type and Suggest Tags**  
  Automatically detect common project structures (e.g., `package.json` for JavaScript, `tsconfig.json` for TypeScript, `requirements.txt` for Python) and suggest relevant tags to add.

- **🚪 Exit**  
  Quit the CLI.

---

## Using the Source Code 🛠️

1. **Install Dependencies:**
   ```bash
   bun install
   ```

2. **Run the Application:**
   ```bash
   bun run index.ts
   ```

3. **Manage Tags (CLI Interface):**
   - **Add a Tag:**  
     Follow prompts to add custom tags.
   
   - **List Tags:**  
     View all tags in `.tags`.
   
   - **Remove a Tag:**  
     Select tags to remove.
   
   - **Clear All Tags:**  
     Remove all tags at once.
   
   - **Detect Project Type and Suggest Tags:**  
     Let the CLI suggest tags based on detected project files.

---

## Compilation

To compile the project manually, run:

```bash
bun build ./index.ts --compile --outfile ./dist/project-tagger
```

Alternatively, use the scripts defined in `package.json`:

- **Build for Current OS:**
   ```bash
   bun run build
   ```

- **Build for Windows:**
   ```bash
   bun run build:windows
   ```

- **Build for Linux:**
   ```bash
   bun run build:linux
   ```

- **Build for macOS:**
   ```bash
   bun run build:mac
   ```

---

Feel free to open an issue if you have any questions or suggestions!