# Filter Bookmarked Lines - Visual Studio Code Extension

## Overview

The "Filter Bookmarked Lines" extension for Visual Studio Code provides a convenient way to filter out lines in the text editor based on debugger breakpoints. It allows users to remove either bookmarked or non-bookmarked lines from the active text document.

## Features

1. **Remove Bookmarked Lines:**
   - Command: `FBL: Remove Bookmarked Lines`
   - Keybinding: `Ctrl+Alt+1` (Windows/Linux) or `Ctrl+Cmd+1` (Mac)
   - Removes lines corresponding to debugger breakpoints.

2. **Remove Non-Bookmarked Lines:**
   - Command: `FBL: Remove Non-Bookmarked Lines`
   - Keybinding: `Ctrl+Alt+2` (Windows/Linux) or `Ctrl+Cmd+2` (Mac)
   - Removes lines not corresponding to debugger breakpoints.

3. **Enable Breakpoints Everywhere:**
   - Command: `FBL: Enable Breakpoints Everywhere`
   - Enables breakpoints everywhere in the code.

4. **Disable Breakpoints Everywhere:**
   - Command: `FBL: Disable Breakpoints Everywhere`
   - Disables breakpoints everywhere in the code.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for "Filter Bookmarked Lines".
4. Click "Install" to install the extension.

## Usage

1. Open a file in the text editor.
2. Use the provided commands to filter lines based on breakpoints.

## Important Note

- The `Enable Breakpoints Everywhere` command should be run only the first time of usage. This sets the necessary configuration to allow breakpoints everywhere in the code.

## Comparison with Notepad++

Visual Studio Code lacked a built-in functionality to filter lines based on debugger breakpoints, which Notepad++ offered. With the "Filter Bookmarked Lines" extension, users can now enjoy a similar feature in Visual Studio Code, enhancing their coding experience.

## Repository

[Filter Bookmarked Lines Repository](https://github.com/hsjeevan/filter-bookmarked-lines)

## VisualStudio Code Marketplace
[Filter Bookmarked lines](https://marketplace.visualstudio.com/items?itemName=hsjeevan.filter-bookmarked-lines)

Feel free to contribute, report issues, or provide feedback on the GitHub repository. Happy coding!