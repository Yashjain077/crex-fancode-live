import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Star } from 'lucide-react';

export const TelegramModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Check if user has already joined with validation
    try {
      const joined = localStorage.getItem('telegram_joined');
      if (joined === 'true') {
        setHasJoined(true);
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      if (!hasJoined) {
        setIsOpen(true);
      }
    };

    // Also show modal on various other interactions to encourage joining
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        if (!hasJoined) {
          setIsOpen(true);
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Show modal after 30 seconds if not joined
    const timer = setTimeout(() => {
      if (!hasJoined) {
        setIsOpen(true);
      }
    }, 30000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [hasJoined]);

  const handleJoinTelegram = () => {
    // Open Telegram link in new tab with security attributes
    window.open('https://t.me/your_cricket_channel', '_blank', 'noopener,noreferrer');
    try {
      localStorage.setItem('telegram_joined', 'true');
      setHasJoined(true);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
    setIsOpen(false);
  };

  const handleAlreadyJoined = () => {
    try {
      localStorage.setItem('telegram_joined', 'true');
      setHasJoined(true);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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