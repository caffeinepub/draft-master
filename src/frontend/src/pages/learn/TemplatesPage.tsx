import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DRAFT_TYPES } from '../../data/draftTypes';

export default function TemplatesPage() {
  const handleDownload = (draftType: string, format: 'txt' | 'pdf') => {
    const template = `[${draftType.toUpperCase()} TEMPLATE]

To,
[Recipient Name]
[Recipient Address]

Date: [Date]

Subject: [Subject Line]

[Salutation],

[Body of the document]

[Closing],
[Your Name]
[Your Designation]`;

    if (format === 'txt') {
      const blob = new Blob([template], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${draftType}-template.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${draftType} Template</title>
            <style>
              @page { margin: 1in; }
              body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body><pre>${template}</pre></body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Templates</h1>
        <p className="text-muted-foreground">
          Professional blank templates for each draft type
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {DRAFT_TYPES.map((draftType) => (
          <Card key={draftType.id}>
            <CardHeader>
              <CardTitle className="text-lg">{draftType.name}</CardTitle>
              <CardDescription>Blank template with proper formatting</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(draftType.id, 'txt')}
              >
                <Download className="h-4 w-4 mr-2" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(draftType.id, 'pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
