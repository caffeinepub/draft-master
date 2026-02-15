import { Outlet, useParams, useNavigate } from '@tanstack/react-router';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDraftTypeInfo } from '../../data/draftTypes';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DraftTypeLayout() {
  const { draftType } = useParams({ from: '/draft/$draftType' });
  const navigate = useNavigate();
  const typeInfo = getDraftTypeInfo(draftType as any);

  if (!typeInfo) {
    return <div>Draft type not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/draft' })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{typeInfo.name}</h1>
          <p className="text-muted-foreground">{typeInfo.description}</p>
        </div>
      </div>

      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger 
            value="structure"
            onClick={() => navigate({ to: `/draft/${draftType}/structure` })}
          >
            1. Learn Structure
          </TabsTrigger>
          <TabsTrigger 
            value="wizard"
            onClick={() => navigate({ to: `/draft/${draftType}/wizard` })}
          >
            2. Guided Wizard
          </TabsTrigger>
          <TabsTrigger 
            value="practice"
            onClick={() => navigate({ to: `/draft/${draftType}/practice` })}
          >
            3. Free Practice
          </TabsTrigger>
          <TabsTrigger 
            value="compare"
            onClick={() => navigate({ to: `/draft/${draftType}/compare` })}
          >
            4. Compare & Improve
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  );
}
