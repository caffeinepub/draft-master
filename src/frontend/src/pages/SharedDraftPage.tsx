import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useActor } from '../hooks/useActor';
import { toast } from 'sonner';

export default function SharedDraftPage() {
  const { token } = useParams({ from: '/share/$token' });
  const { actor } = useActor();
  const [draft, setDraft] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (actor) {
      actor.getDraftByShareLink(token).then((result) => {
        setDraft(result);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [actor, token]);

  const handleAddComment = async () => {
    if (!actor || !comment.trim()) return;
    
    try {
      await actor.addComment(token, comment);
      toast.success('Comment added');
      setComment('');
      const updated = await actor.getDraftByShareLink(token);
      setDraft(updated);
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading shared draft...</p>
        </CardContent>
      </Card>
    );
  }

  if (!draft) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            This shared draft is no longer available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shared Draft</h1>
        <p className="text-muted-foreground">
          View and comment on this draft
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Draft Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
            {draft.content}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments ({draft.comments?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.comments && draft.comments.length > 0 && (
            <div className="space-y-2">
              {draft.comments.map((c: string, i: number) => (
                <div key={i} className="bg-muted p-3 rounded-lg text-sm">
                  {c}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAddComment} disabled={!comment.trim()}>
              Add Comment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
