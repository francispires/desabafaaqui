import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../../lib/supabase';
import { Complaint } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ComplaintCardProps {
  complaint: Complaint;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const { user } = useUser();
  const [reactions, setReactions] = useState({
    agrees: complaint.agrees || 0,
    disagrees: complaint.disagrees || 0,
    userReaction: complaint.userReaction
  });
  const [isReacting, setIsReacting] = useState(false);

  const handleReaction = async (type: 'agree' | 'disagree') => {
    if (!user || isReacting) return;
    setIsReacting(true);

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
    } finally {
      setIsReacting(false);
    }
  };

  const getStatusBadge = () => {
    switch (complaint.status) {
      case 'pending':
        return <Badge variant="warning">Aguardando</Badge>;
      case 'in-progress':
        return <Badge variant="primary">Em andamento</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolvido</Badge>;
      case 'ignored':
        return <Badge variant="danger">Ignorado</Badge>;
      default:
        return null;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Link href={`/complaints/${complaint.id}`} className="block">
      <Card 
        hoverable 
        className="transition-all duration-200 transform hover:translate-y-[-2px]"
      >
        <CardContent className="pt-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Avatar
                src={complaint.userAvatar}
                alt={complaint.userName}
                fallback={complaint.userName}
                size="sm"
              />
              <div className="ml-2">
                <span className="text-sm font-medium text-gray-700">{complaint.userName}</span>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Sobre</span>
                  <span className="font-medium text-gray-700 ml-1">{complaint.companyName}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {getStatusBadge()}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-base font-medium text-gray-900">{complaint.title}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {truncateText(complaint.description, 120)}
            </p>
            <div className="mt-3">
              <Rating value={complaint.rating} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                reactions.userReaction === 'agree' ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleReaction('agree');
              }}
              disabled={isReacting}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{reactions.agrees}</span>
              <span className="sr-only">Também me sinto assim</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                reactions.userReaction === 'disagree' ? 'text-red-600' : 'text-gray-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleReaction('disagree');
              }}
              disabled={isReacting}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{reactions.disagrees}</span>
              <span className="sr-only">Não concordo</span>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>{formatDistanceToNow(complaint.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-3.5 h-3.5 mr-1" />
            <span>{complaint.comments?.length || 0} comentários</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};