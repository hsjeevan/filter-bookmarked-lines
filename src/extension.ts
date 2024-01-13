import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('filter-bookmarked-lines', () => {

    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      // Get the document and its content
      const document = editor.document;
      const text = document.getText();

      // Get the bookmarked lines
      const bookmarkedLines = getBookmarkedLines(text);

      // Filter out the bookmarked lines
      const linesToKeep = text
        .split('\n')
        .filter((_, index) => !bookmarkedLines.includes(index + 1));

      // Join the remaining lines
      const updatedText = linesToKeep.join('\n');

      // Replace the document content with the updated text
      editor.edit((editBuilder) => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount, 0);
        const range = new vscode.Range(start, end);
        editBuilder.replace(range, updatedText);
      });

      vscode.window.showInformationMessage('Bookmarked lines removed successfully.');
    }
  });

  context.subscriptions.push(disposable);
}

function getBookmarkedLines(text: string): number[] {
  // Extract line numbers with bookmarks from the text
  const bookmarkedLines: number[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('// @bookmark')) {
      bookmarkedLines.push(index + 1);
    }
  });

  return bookmarkedLines;
}

