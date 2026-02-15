import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { legalNoticeAnatomy } from '../../data/legalNotice';
import { CheckCircle2 } from 'lucide-react';

export default function StructureTutorialPage() {
  const { draftType } = useParams({ from: '/draft/$draftType/structure' });

  if (draftType !== 'legal-notice') {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Tutorial content for {draftType} coming soon
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{legalNoticeAnatomy.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {legalNoticeAnatomy.sections.map((section, index) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{index + 1}.</span>
                    <span>{section.name}</span>
                    {section.essential && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{section.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Annotated Model Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg font-mono text-sm whitespace-pre-wrap">
            {legalNoticeAnatomy.modelNotice}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
