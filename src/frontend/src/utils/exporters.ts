import { DraftAttempt } from '../storage/types';
import { getDraftTypeInfo } from '../data/draftTypes';

export function exportDraftAsText(draft: DraftAttempt): void {
  const blob = new Blob([draft.content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `draft-${draft.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportDraftAsPDF(draft: DraftAttempt): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const typeInfo = getDraftTypeInfo(draft.draftType);
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${typeInfo?.name || 'Draft'}</title>
        <style>
          @page { margin: 1in; }
          body {
            font-family: Georgia, serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
          }
          .header {
            text-align: center;
            margin-bottom: 2em;
            font-weight: bold;
          }
          .content {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">${typeInfo?.name || 'Legal Draft'}</div>
        <div class="content">${draft.content}</div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

export function exportAllDrafts(drafts: DraftAttempt[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const content = drafts.map((draft, index) => {
    const typeInfo = getDraftTypeInfo(draft.draftType);
    return `
      <div class="draft-page" style="${index > 0 ? 'page-break-before: always;' : ''}">
        <div class="header">
          <h2>${typeInfo?.name || 'Draft'}</h2>
          <p>Score: ${draft.score}/10 | Date: ${new Date(draft.date).toLocaleDateString()}</p>
        </div>
        <div class="content">${draft.content}</div>
      </div>
    `;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Draft Portfolio</title>
        <style>
          @page { margin: 1in; }
          body {
            font-family: Georgia, serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
          }
          .header {
            text-align: center;
            margin-bottom: 2em;
          }
          .content {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
