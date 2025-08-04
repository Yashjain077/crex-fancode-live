import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Star } from 'lucide-react';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramModal = ({ isOpen, onClose }: TelegramModalProps) => {
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Check if user has already joined
    try {
      const joined = localStorage.getItem('telegram_joined');
      if (joined === 'true') {
        setHasJoined(true);
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }
  }, []);

  const handleJoinTelegram = () => {
    // Open Telegram link in new tab
    window.open('https://t.me/CricketNewsSkull', '_blank', 'noopener,noreferrer');
    try {
      localStorage.setItem('telegram_joined', 'true');
      setHasJoined(true);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
    onClose();
  };

  const handleAlreadyJoined = () => {
    try {
      localStorage.setItem('telegram_joined', 'true');
      setHasJoined(true);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-border/20">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold">Join Our Cricket Community!</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get instant updates, exclusive content, and join thousands of cricket fans in our Telegram channel!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          {/* Benefits */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
              <Star className="w-5 h-5 text-cricket-gold" />
              <span className="text-sm">Live match updates & highlights</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm">20,000+ active cricket fans</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-accent" />
              <span className="text-sm">Exclusive behind-the-scenes content</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleJoinTelegram}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Telegram Channel
            </Button>
            
            <Button 
              onClick={handleAlreadyJoined}
              variant="outline"
              className="w-full"
            >
              Already Joined
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By joining, you agree to receive updates about cricket matches and related content.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};