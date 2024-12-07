# Tagmaster 🚀

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## How to Use 🛠️

1. **Install Dependencies:**
    ```bash
    bun install
    ```

2. **Run the Application:**
    ```bash
    bun run index.ts
    ```

3. **Manage Tags:**
    - **Add a Tag:** ➕ Follow the prompts to add a new tag.
    - **List Tags:** 📃 View all existing tags.
    - **Remove a Tag:** 🗑️ Select tags to remove.
    - **Clear All Tags:** 🧹 Delete all tags at once.

## Compilation

To compile the project manually, run:

```bash
bun build ./index.ts --compile --outfile ./dist/tagmaster
```

Alternatively, you can use the predefined scripts in `package.json`:

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

## Script Details 📝

The `index.ts` script provides a command-line interface to manage project tags. It allows users to add either custom or default tags, display all existing tags, delete selected tags, and remove all tags after confirmation. The script utilizes Bun ⚡ as the JavaScript runtime to execute the script, Inquirer ❓ to handle interactive prompts for a smoother user experience, and Chalk 🎨 to add color to terminal outputs for better readability. Additionally, it manages tag files in the `tags` directory using file system operations, ensuring efficient organization and categorization within your development workflow.

**Technologies Used:**

- **Bun:** JavaScript runtime for running the script.
- **Inquirer:** Handles interactive prompts.
- **Chalk:** Adds colors to terminal outputs.
- **File System Operations:** Manages tag files in the `tags` directory.

