import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let filtered = vscode.commands.registerCommand('extension.filter-bookmarked-lines', () => {
    let requestStatus = 1;
    commonCode(requestStatus);
  });

  

  context.subscriptions.push(filtered);
  let unfiltered = vscode.commands.registerCommand('extension.filter-unbookmarked-lines', () => {
    let requestStatus = 0;
    commonCode(requestStatus);
  });
  context.subscriptions.push(unfiltered);
}
function commonCode(requestStatus:Number){
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    // Get the document and its content
    const document = editor.document;
    const text = document.getText();

    // Get the bookmarked lines
    const bookmarkedLines = getBookmarkedLines(text, requestStatus);

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

    vscode.window.showInformationMessage(requestStatus? 'Bookmarked lines removed successfully.': 'Bookmarked lines removed successfully.');
  }
}
function getBookmarkedLines(text: string, status: Number): number[] {
  // Extract line numbers with bookmarks from the text
  const bookmarkedLines: number[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    if (status? line.includes('!@'): !line.includes('!@')) {
      bookmarkedLines.push(index + 1);
    }
  });

  return bookmarkedLines;
}

