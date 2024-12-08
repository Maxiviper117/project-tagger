Thanks for clarifying! Here's an updated README with a focus on using the project as a CLI tool:

---

# Project Tagger 🚀

A simple command-line tool for managing project tags directly.

---

## Installation & Usage 📦

### As an npm Package (CLI Tool)

1. **Install Globally:**
   ```bash
   npm install -g project-tagger
   ```

2. **Run the Tool:**
   ```bash
   project-tagger
   ```

3. **Manage Tags:**
   - **Add a Tag:** ➕ Follow the prompts to add a new tag.
   - **List Tags:** 📃 View all existing tags.
   - **Remove a Tag:** 🗑️ Select tags to remove.
   - **Clear All Tags:** 🧹 Delete all tags at once.

### Using npx project-tagger

```bash
npx project-tagger
```

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

## About the Tool 📝

**Project Tagger** is a CLI tool designed to streamline the management of tags for your development projects. It offers an intuitive command-line interface to:

- Add tags (custom or default).
- List all existing tags.
- Remove specific tags.
- Clear all tags after confirmation.

### Key Features:
- **Interactive Prompts:** Seamless user interaction powered by Inquirer ❓.
- **Color-Coded Outputs:** Enhanced readability with Chalk 🎨.
- **Efficient File Management:** Organizes tag files in the `tags` directory.

---

Let me know if you'd like any further refinements!