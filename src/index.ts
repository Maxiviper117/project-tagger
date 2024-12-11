#!/usr/bin/env node

import {
  readdirSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  writeFileSync,
  readFileSync,
} from "fs";
import { resolve } from "path";
import chalk from "chalk";
import inquirer from "inquirer";


const TAGS_FOLDER = ".tags";
const TAG_EXTENSION = ".project.tag";

// Ensure the tags folder exists
function getTagsFolder(basePath: string): string {
  const tagsPath = resolve(basePath, TAGS_FOLDER);
  const oldTagsPath = resolve(basePath, "tags");

  // Migrate tags from 'tags' to '.tag' if 'tags' exists
  if (existsSync(oldTagsPath)) {
    if (!existsSync(tagsPath)) {
      mkdirSync(tagsPath, { recursive: true });
    }
    readdirSync(oldTagsPath).forEach((file) => {
      const oldFile = resolve(oldTagsPath, file);
      const newFile = resolve(tagsPath, file);
      // Move file
      // Note: For simplicity, using renameSync; consider handling errors in production
      require("fs").renameSync(oldFile, newFile);
    });
    // Remove the old 'tags' folder
    require("fs").rmdirSync(oldTagsPath);
    console.log(chalk.green(`✅ Migrated tags from 'tags' to '${TAGS_FOLDER}'.`));
  }

  if (!existsSync(tagsPath)) {
    mkdirSync(tagsPath, { recursive: true });
  }
  return tagsPath;
}

// Add a new tag
function addTag(tagsPath: string, tag: string): void {
  const sanitizedTag = tag.replace(/\s+/g, '_'); // Replace spaces with underscores
  console.log(chalk.gray(`🔍 Attempting to add tag: '${sanitizedTag}'`));
  const tagFile = resolve(tagsPath, `${sanitizedTag}${TAG_EXTENSION}`);
  if (!existsSync(tagFile)) {
    writeFileSync(tagFile, "", "utf8");
    console.log(chalk.green(`✅ Tag '${sanitizedTag}' added successfully.`));
  } else {
    console.log(chalk.yellow(`⚠️  Tag '${sanitizedTag}' already exists.`));
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
  console.log(chalk.gray(`🔍 Tags directory: ${tagsPath}`)); // Added log

  while (true) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "Select an action:\n",
      choices: [
        { name: "✨ Add Tag", value: "add" },
        { name: "📋 List Tags", value: "list" },
        { name: "❌ Remove Tag", value: "remove" },
        { name: "🧹 Clear All Tags", value: "clear" },
        { name: "🔍 Detect Project Type and Suggest Tags", value: "detect" }, // New option
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

      case "detect":
        await detectAndSuggestTags(tagsPath, basePath); // Handle new action
        break;

      default:
        console.log(chalk.red("❌ Invalid action selected."));
    }
  }
}

// New function to detect project type and suggest tags
async function detectAndSuggestTags(tagsPath: string, basePath: string): Promise<void> {
  const suggestedTags: string[] = [];
  const packageJsonPath = resolve(basePath, "package.json");

  // Detect TypeScript projects
  if (existsSync(resolve(basePath, "tsconfig.json"))) {
    suggestedTags.push("typescript");
  }

  // Detect JavaScript projects
  if (existsSync(resolve(basePath, "package.json"))) {
    suggestedTags.push("javascript");
  }

  // Detect React projects
  if (existsSync(resolve(basePath, "src")) && existsSync(resolve(basePath, "public"))) {
    suggestedTags.push("react");
  }

  // Detect Python projects
  if (existsSync(resolve(basePath, "requirements.txt")) || existsSync(resolve(basePath, "setup.py"))) {
    suggestedTags.push("python");
  }

  // Detect Bun projects
  if (existsSync(resolve(basePath, "bun.lockb"))) {
    suggestedTags.push("bun");
  }

  // Detect git projects, looking for .git folder
  if (existsSync(resolve(basePath, ".git"))) {
    suggestedTags.push("git");
  }

  // Dete Rust projects
  if (existsSync(resolve(basePath, "Cargo.toml"))) {
    suggestedTags.push("rust");
  }

  // Detect Go projects
  if (existsSync(resolve(basePath, "go.mod"))) {
    suggestedTags.push("go");
  }

  // Detect PHP projects
  if (existsSync(resolve(basePath, "composer.json"))) {
    suggestedTags.push("php");
  }

  // Enhanced Laravel detection
  if (
    existsSync(resolve(basePath, "artisan")) &&
    existsSync(packageJsonPath) &&
    readFileSync(packageJsonPath, "utf-8").includes("laravel/framework")
  ) {
    suggestedTags.push("laravel");
  }

    // Detect Express.js projects
  if (
    (existsSync(resolve(basePath, "app.js")) || existsSync(resolve(basePath, "server.js"))) &&
    existsSync(packageJsonPath) &&
    JSON.parse(readFileSync(packageJsonPath, "utf-8")).dependencies?.express
  ) {
    suggestedTags.push("express");
  }


  // Detect Svelte projects
  if (
    existsSync(resolve(basePath, "svelte.config.js")) &&
    existsSync(resolve(basePath, "src")) &&
    readdirSync(resolve(basePath, "src")).some(file => file.endsWith(".svelte"))
  ) {
    suggestedTags.push("svelte");
  }

  // Detect Angular projects
  if (
    existsSync(resolve(basePath, "angular.json")) &&
    existsSync(resolve(basePath, "src", "app"))
  ) {
    suggestedTags.push("angular");
  }

   // Detect Vue.js projects
  if (
    existsSync(resolve(basePath, "vue.config.js")) ||
    existsSync(resolve(basePath, "vite.config.js")) &&
    existsSync(resolve(basePath, "src", "components"))
  ) {
    suggestedTags.push("vue");
  }

  // Add more detections as needed

  if (suggestedTags.length === 0) {
    console.log(chalk.yellow("❌ No recognizable project files found for auto-suggesting tags."));
    return;
  }

  console.log(chalk.cyan("📋 Suggested Tags based on project files:"));
  suggestedTags.forEach((tag) => console.log(chalk.blue(`- ${tag}`)));

  // Replace confirmation prompt with checkbox selection
  const { selectedTags } = await inquirer.prompt({
    type: "checkbox",
    name: "selectedTags",
    message: "Select tags to add (space to select, a to select all):",
    choices: suggestedTags,
    pageSize: suggestedTags.length + 2, // Adjust page size based on the number of tags
  });

  if (selectedTags.length > 0) {
    selectedTags.forEach((tag: string) => addTag(tagsPath, tag));
  } else {
    console.log(chalk.yellow("⚠️  No tags selected."));
  }
}

// Run the CLI
const basePath: string = ".";
showMenu(basePath);
