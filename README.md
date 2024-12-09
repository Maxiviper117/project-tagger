# Project Tagger 🚀

A lightweight CLI tool that simplifies project organization through a tag-based system. Create and manage project tags to efficiently locate and categorize your projects across your filesystem.

## How It Works 🔍

Project Tagger creates `.project.tag` files in a `tags` directory within your project root. These tag files act as markers that can be easily searched using file system search tools.

Example tag files:
- `javascript.project.tag`
- `local-git.project.tag`
- `github.project.tag`

### Use Case Example

To find all projects pushed to GitHub:
1. Add the `github.project.tag` to relevant projects
2. Search for `github.project.tag` using Everything or `fzf`
3. Instantly locate all GitHub projects, regardless of their location

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

## Usage 🚀

1. Navigate to your project root:
   ```bash
   cd /path/to/your/project
   ```

2. Run Project Tagger:
   ```bash
   project-tagger
   ```

### CLI Menu Options

- **Add Tag** ➕
  - Choose from predefined tags or create custom ones
  - Tags are stored in the `/tags` directory

- **List Tags** 📃
  - View all tags in the current project

- **Remove Tag** 🗑️
  - Select specific tags to remove

- **Clear All Tags** 🧹
  - Remove all tags from the current project


---

### Using the Source Code 🛠️

1. **Install Dependencies:**
   ```bash
   bun install
   ```

2. **Run the Application:**
   ```bash
   bun run index.ts
   ```

3. **Manage Tags (CLI Interface):**
   - **Add a Tag:** ➕ Follow the prompts to add a new tag.
   - **List Tags:** 📃 View all existing tags.
   - **Remove a Tag:** 🗑️ Select tags to remove.
   - **Clear All Tags:** 🧹 Delete all tags at once.

---

## Compilation

To compile the project manually, run:

```bash
bun build ./index.ts --compile --outfile ./dist/project-tagger
```

Alternatively, use the predefined scripts in `package.json`:

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

Let me know if you'd like any further refinements!