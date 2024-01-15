import * as vscode from 'vscode';

enum RequestStatus {
  Bookmarked = 1,
  NonBookmarked = 0,
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.filter-bookmarked-lines', () => {
    handleFilterCommand(RequestStatus.Bookmarked);
  }));

  context.subscriptions.push(vscode.commands.registerCommand('extension.filter-non-bookmarked-lines', () => {
    handleFilterCommand(RequestStatus.NonBookmarked);
  }));
}

function handleFilterCommand(requestStatus: RequestStatus) {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const text = document.getText();
    const breakpointsArr: any = vscode.debug.breakpoints;

    const bookmarkedLines = getBookmarkedLines(breakpointsArr);
    const linesToKeep = filterLines(text, bookmarkedLines, requestStatus);
    const updatedText = linesToKeep.join('\n');

    replaceDocumentContent(editor, updatedText);

    removeBreakpoints(breakpointsArr);

    const successMessage = requestStatus === RequestStatus.Bookmarked ?
      'Bookmarked lines removed successfully.' : 'Non-bookmarked lines removed successfully.';

    vscode.window.showInformationMessage(successMessage);
  }
}

function filterLines(text: string, bookmarkedLines: number[], requestStatus: RequestStatus): string[] {
  return text.split('\n')
    .filter((_, index) => requestStatus === RequestStatus.Bookmarked ? !bookmarkedLines.includes(index + 1) : bookmarkedLines.includes(index + 1));
}

function getBookmarkedLines(breakpoints: vscode.Breakpoint[]): number[] {
  return breakpoints.map((breakpoint: any) => {
    const start = breakpoint.location?.range?.start;
    return start ? start.line + 1 : -1;
  }).filter(lineNumber => lineNumber !== -1);
}

function replaceDocumentContent(editor: vscode.TextEditor, updatedText: string) {
  editor.edit((editBuilder) => {
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(editor.document.lineCount, 0);
    const range = new vscode.Range(start, end);
    editBuilder.replace(range, updatedText);
  });
}

function removeBreakpoints(breakpoints: vscode.Breakpoint[]) {
  for (const breakpoint of breakpoints) {
    vscode.debug.removeBreakpoints([breakpoint]);
  }
}
