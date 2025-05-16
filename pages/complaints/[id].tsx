import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../../src/lib/supabase';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { Avatar } from '../../src/components/ui/Avatar';
import { MessageCircle, ThumbsUp, ThumbsDown, Share2, Clock, Building, ArrowLeft } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'ignored';
  rating: number;
  companyId: string;
  companyName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
}

export default function ComplaintDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState({
    agrees: 0,
    disagrees: 0,
    userReaction: null as 'agree' | 'disagree' | null
  });

  useEffect(() => {
    if (id) {
      fetchComplaintData();
    }
  }, [id]);

  const fetchComplaintData = async () => {
    try {
      // Fetch complaint
      const { data: complaintData, error: complaintError } = await supabase
        .from('complaints')
        .select(`
          *,
          companies (
            name,
            logo_url
          ),
          users (
            name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (complaintError) throw complaintError;

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select(`
          *,
          users (
            name,
            avatar_url
          )
        `)
        .eq('complaint_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Fetch reactions
      const { data: reactionsData, error: reactionsError } = await supabase
        .from('reactions')
        .select('*')
        .eq('complaint_id', id);

      if (reactionsError) throw reactionsError;

      // Get user's reaction if they're logged in
      let userReaction = null;
      if (user) {
        const userReactionData = reactionsData.find(r => r.user_id === user.id);
        if (userReactionData) {
          userReaction = userReactionData.type;
        }
      }

      setComplaint(complaintData);
      setComments(commentsData);
      setReactions({
        agrees: reactionsData.filter(r => r.type === 'agree').length,
        disagrees: reactionsData.filter(r => r.type === 'disagree').length,
        userReaction
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = async (type: 'agree' | 'disagree') => {
    if (!user || !complaint) return;

    try {
      if (reactions.userReaction === type) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .match({ complaint_id: complaint.id, user_id: user.id });

        setReactions(prev => ({
          ...prev,
          [type === 'agree' ? 'agrees' : 'disagrees']: prev[type === 'agree' ? 'agrees' : 'disagrees'] - 1,
          userReaction: null
        }));
      } else {
        // If user had previous reaction, remove it first
        if (reactions.userReaction) {
          await supabase
            .from('reactions')
            .delete()
            .match({ complaint_id: complaint.id, user_id: user.id });

          setReactions(prev => ({
            ...prev,
            [reactions.userReaction === 'agree' ? 'agrees' : 'disagrees']: 
              prev[reactions.userReaction === 'agree' ? 'agrees' : 'disagrees'] - 1
          }));
        }

        // Add new reaction
        await supabase
          .from('reactions')
          .insert({
            complaint_id: complaint.id,
            user_id: user.id,
            type
          });

        setReactions(prev => ({
          ...prev,
          [type === 'agree' ? 'agrees' : 'disagrees']: prev[type === 'agree' ? 'agrees' : 'disagrees'] + 1,
          userReaction: type
        }));
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !complaint || !newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          complaint_id: complaint.id,
          user_id: user.id,
          content: newComment.trim()
        })
        .select(`
          *,
          users (
            name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setComments(prev => [...prev, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            <p className="mt-4 text-gray-600">Carregando desabafo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Desabafo não encontrado</h1>
            <Link href="/complaints">
              <Button>Voltar para lista de desabafos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back navigation */}
          <div className="mb-6">
            <Link href="/complaints" className="inline-flex items-center text-sm text-blue-700 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para desabafos
            </Link>
          </div>

          {/* Complaint card */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <Avatar
                    src={complaint.userAvatar}
                    alt={complaint.userName}
                    fallback={complaint.userName}
                    size="md"
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-900">{complaint.userName}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge variant={complaint.status === 'resolved' ? 'success' : 'warning'}>
                  {complaint.status === 'resolved' ? 'Resolvido' : 'Em andamento'}
                </Badge>
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-2">{complaint.title}</h1>

              <div className="flex items-center mb-4">
                <Link href={`/companies/${complaint.companyId}`} className="flex items-center text-gray-700 hover:text-blue-700">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="font-medium">{complaint.companyName}</span>
                </Link>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{complaint.description}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${
                      reactions.userReaction === 'agree' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                    onClick={() => handleReaction('agree')}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{reactions.agrees}</span>
                    <span>Também me sinto assim</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 ${
                      reactions.userReaction === 'disagree' ? 'text-red-600' : 'text-gray-600'
                    }`}
                    onClick={() => handleReaction('disagree')}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{reactions.disagrees}</span>
                    <span>Não concordo</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600"
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </Card>

          {/* Comments section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-700" />
              Comentários ({comments.length})
            </h2>

            {/* Comment form */}
            {user && (
              <Card className="mb-6">
                <div className="p-4">
                  <form onSubmit={handleSubmitComment}>
                    <div className="flex items-start space-x-4">
                      <Avatar
                        src={user.imageUrl}
                        alt={user.fullName || ''}
                        fallback={user.fullName || ''}
                        size="sm"
                      />
                      <div className="flex-1">
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          rows={3}
                          placeholder="Deixe seu comentário..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          required
                        />
                        <div className="mt-2 flex justify-end">
                          <Button type="submit" size="sm">
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            )}

            {/* Comments list */}
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map(comment => (
                  <Card key={comment.id}>
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar
                          src={comment.userAvatar}
                          alt={comment.userName}
                          fallback={comment.userName}
                          size="sm"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium text-gray-900">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="mt-1 text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-6 text-center">
                  <p className="text-gray-500">Seja o primeiro a comentar neste desabafo.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 