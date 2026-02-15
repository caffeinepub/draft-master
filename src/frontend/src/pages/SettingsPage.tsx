import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useOfflineState } from '../storage/useOfflineState';
import { resetStorage, exportData, importData } from '../storage/localStore';
import { toast } from 'sonner';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { settings, updateState, masteryEvents } = useOfflineState();
  const [nexusEndpoint, setNexusEndpoint] = useState(settings.nexusEndpoint || '');

  const handleReset = () => {
    resetStorage();
    window.location.reload();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `draft-master-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result as string;
          if (importData(data)) {
            toast.success('Data imported successfully');
            window.location.reload();
          } else {
            toast.error('Failed to import data');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportMasteryEvents = () => {
    const data = JSON.stringify(masteryEvents, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mastery-events-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Mastery events exported');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Features</CardTitle>
          <CardDescription>Enable or disable practice modes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Voice-to-Text Drafting</Label>
              <p className="text-sm text-muted-foreground">
                Use speech recognition for drafting
              </p>
            </div>
            <Switch
              checked={settings.voiceToTextEnabled}
              onCheckedChange={(checked) => 
                updateState({ settings: { ...settings, voiceToTextEnabled: checked } })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Online Features</CardTitle>
          <CardDescription>Sync and backup options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Online Backup & Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Enable cloud sync for shared drafts
              </p>
            </div>
            <Switch
              checked={settings.onlineBackupEnabled}
              onCheckedChange={(checked) => 
                updateState({ settings: { ...settings, onlineBackupEnabled: checked } })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NEXUS Integration</CardTitle>
          <CardDescription>Sync mastery progress with NEXUS system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable NEXUS Sync</Label>
              <p className="text-sm text-muted-foreground">
                Send mastery events to NEXUS
              </p>
            </div>
            <Switch
              checked={settings.nexusSyncEnabled}
              onCheckedChange={(checked) => 
                updateState({ settings: { ...settings, nexusSyncEnabled: checked } })
              }
            />
          </div>
          
          {settings.nexusSyncEnabled && (
            <div className="space-y-2">
              <Label>NEXUS Endpoint URL</Label>
              <Input
                type="url"
                placeholder="https://your-nexus-endpoint.com/api/mastery"
                value={nexusEndpoint}
                onChange={(e) => setNexusEndpoint(e.target.value)}
                onBlur={() => updateState({ settings: { ...settings, nexusEndpoint } })}
              />
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportMasteryEvents}
            disabled={masteryEvents.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Mastery Events
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Backup and restore your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Backup
            </Button>
            <Button variant="outline" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-2" />
              Import Backup
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your drafts, progress, and settings.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  Reset Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
