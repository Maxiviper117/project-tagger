import {
  readdirSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { resolve } from "path";
import chalk from "chalk";
import inquirer from "inquirer";

const TAGS_FOLDER = "tags";
const TAG_EXTENSION = ".project.tag";
const DEFAULT_TAGS = [
  "local-git-repo",
  "published-git-repo",
  "python",
  "typescript",
  "react",
  "nodejs",
];

// Ensure the tags folder exists
function getTagsFolder(basePath: string): string {
  const tagsPath = resolve(basePath, TAGS_FOLDER);
  if (!existsSync(tagsPath)) {
    mkdirSync(tagsPath, { recursive: true });
  }
  return tagsPath;
}

// Add a new tag
function addTag(tagsPath: string, tag: string): void {
  const tagFile = resolve(tagsPath, `${tag}${TAG_EXTENSION}`);
  if (!existsSync(tagFile)) {
    writeFileSync(tagFile, "", "utf8");
    console.log(chalk.green(`✅ Tag '${tag}' added successfully.`));
  } else {
    console.log(chalk.yellow(`⚠️  Tag '${tag}' already exists.`));
  }
}

// List all tags
function listTags(tagsPath: string): void {
  try {
    const tags = readdirSync(tagsPath)
      .filter((file) => file.endsWith(TAG_EXTENSION))
      .map((file) => file.slice(0, -TAG_EXTENSION.length));

    if (tags.length === 0) {
      console.log(chalk.red(`❌ No tags found in '${TAGS_FOLDER}'.`));
    } else {
      console.log(chalk.cyan(`📋 Tags found in '${TAGS_FOLDER}':`));
      tags.forEach((tag) => console.log(chalk.blue(`- ${tag}`)));
    }
  } catch (err) {
    console.error(chalk.red(`❌ Error listing tags: ${(err as Error).message}`));
  }
}

// Remove a specific tag
function removeTag(tagsPath: string, tag: string): void {
  const tagFile = resolve(tagsPath, `${tag}${TAG_EXTENSION}`);
  if (existsSync(tagFile)) {
    unlinkSync(tagFile);
    console.log(chalk.green(`✅ Tag '${tag}' removed successfully.`));
  } else {
    console.log(chalk.red(`❌ Tag '${tag}' does not exist.`));
  }
}

// Clear all tags
async function clearTags(tagsPath: string): Promise<void> {
  const tagFiles = readdirSync(tagsPath).filter((file) =>
    file.endsWith(TAG_EXTENSION)
  );

  if (tagFiles.length === 0) {
    console.log(chalk.red(`❌ No tags to clear in '${TAGS_FOLDER}'.`));
    return;
  }

  const { confirm } = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message: `Are you sure you want to delete all ${tagFiles.length} tag(s)? This action cannot be undone.`,
  });

  if (confirm) {
    tagFiles.forEach((file) => unlinkSync(resolve(tagsPath, file)));
    console.log(chalk.green(`✅ Cleared ${tagFiles.length} tag(s).`));
  } else {
    console.log(chalk.yellow(`⚠️  Clear tags operation canceled.`));
  }
}

// Main Menu
async function showMenu(basePath: string): Promise<void> {
  const tagsPath = getTagsFolder(basePath);

  while (true) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Select an action:",
      choices: [
        { name: "✨ Add Tag", value: "add" },
        { name: "📋 List Tags", value: "list" },
        { name: "❌ Remove Tag", value: "remove" },
        { name: "🧹 Clear All Tags", value: "clear" },
        { name: "🚪 Exit", value: "exit" },
      ],
    });

    if (action === "exit") {
      console.log(chalk.green("👋 Goodbye!"));
      break;
    }

    switch (action) {
      case "add":
        const { addMethod } = await inquirer.prompt({
          type: "list",
          name: "addMethod",
          message: "How would you like to add a tag?",
          choices: [
            { name: "🆕 Add a Custom Tag", value: "custom" },
            { name: "📌 Select from Default Tags", value: "default" },
            { name: "🔙 Return to Main Menu", value: "return" },
          ],
        });

        if (addMethod === "custom") {
          const { customTag } = await inquirer.prompt<{ customTag: string }>({
            type: "input",
            name: "customTag",
            message: "Enter the names of the custom tags, separated by commas:",
          });

          if (customTag) {
            const tags = customTag.split(',').map((tag: string) => tag.trim()).filter(tag => tag);
            tags.forEach((tag: string) => addTag(tagsPath, tag));
          } else {
            console.log(chalk.red("❌ Tag name cannot be empty."));
          }
        } else if (addMethod === "default") {
          const { selectedTags } = await inquirer.prompt({
            type: "checkbox",
            name: "selectedTags",
            message: "Select default tags to add:",
            choices: DEFAULT_TAGS,
          });

          selectedTags.forEach((tag: string) => addTag(tagsPath, tag));
        }
        break;

      case "list":
        listTags(tagsPath);
        break;

      case "remove":
        const tags = readdirSync(tagsPath)
          .filter((file) => file.endsWith(TAG_EXTENSION))
          .map((file) => file.slice(0, -TAG_EXTENSION.length));

        if (tags.length === 0) {
          console.log(chalk.red(`❌ No tags available to remove.`));
        } else {
          const { tagsToRemove } = await inquirer.prompt({
            type: "checkbox",
            name: "tagsToRemove",
            message: "Select tags to remove:",
            choices: tags,
          });

          tagsToRemove.forEach((tag: string) => removeTag(tagsPath, tag));
        }
        break;

      case "clear":
        await clearTags(tagsPath);
        break;

      default:
        console.log(chalk.red("❌ Invalid action selected."));
    }
  }
}

// Run the CLI
const basePath: string = ".";
showMenu(basePath);
