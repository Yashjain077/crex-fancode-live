import { useEffect, useState, useRef } from 'react';
import { CustomVideoPlayer } from '@/components/CustomVideoPlayer';
import { TelegramModal } from '@/components/TelegramModal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import cricketIcon from '@/assets/cricket-icon.png';

const Match3 = () => {
  const streamUrl = "https://matchmaker.live.bidi.net.uk/vs-cmaf-push-uk/x=4/i=urn:bbc:pips:service:bbc_two_hd/pc_hd_abr_v2.mpd";
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [isStreamPlaying, setIsStreamPlaying] = useState(true);
  const [isKeyMomentPlaying, setIsKeyMomentPlaying] = useState(false);
  const keyMomentRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.title = "Pakistan vs West Indies 3rd T20I - Skull Crick News";
    
    // Show Telegram modal on every page load/reload
    setShowTelegramModal(true);
    
    // Block inspect element and developer tools
    const blockInspect = (e: KeyboardEvent) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    const blockRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('keydown', blockInspect);
    document.addEventListener('contextmenu', blockRightClick);
    
    // Block text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    return () => {
      document.removeEventListener('keydown', blockInspect);
      document.removeEventListener('contextmenu', blockRightClick);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <img src={cricketIcon} alt="Cricket" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-foreground">Skull Crick News</h1>
            </div>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Match Header */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/lovable-uploads/7c51b78b-3a73-4910-9be6-febb23733140.png)` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-4 md:p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-cricket-gold" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Pakistan vs West Indies</h2>
            </div>
            <p className="text-base md:text-xl text-white/90">3rd T20I - Pakistan vs West Indies T20I Series 2025</p>
          </div>
        </div>

        {/* Video Player */}
        <Card className="p-4 md:p-6 bg-gradient-card border-border/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Stream</h3>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
          
          {/* Mobile-optimized video container */}
          <div className="aspect-[9/16] sm:aspect-[4/3] md:aspect-video">
            <CustomVideoPlayer 
              src={streamUrl}
              title="Pakistan vs West Indies - 3rd T20I"
              className="w-full h-full"
              isLive={true}
            />
          </div>
        </Card>

        {/* Key Moments */}
        <Card className="p-4 md:p-6 bg-gradient-card border-border/20">
          <h3 className="text-lg font-semibold mb-4">Key Moments</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Toss Video</h4>
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe 
                  ref={keyMomentRef}
                  src="https://streamable.com/e/3nzsca?autoplay=0&nocontrols=0"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none' }}
                  onLoad={() => {
                    // Listen for play events from iframe
                    const iframe = keyMomentRef.current;
                    if (iframe) {
                      iframe.addEventListener('load', () => {
                        // When key moment starts playing, pause stream
                        if (isKeyMomentPlaying && isStreamPlaying) {
                          setIsStreamPlaying(false);
                        }
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Telegram Modal */}
        <TelegramModal 
          isOpen={showTelegramModal}
          onClose={() => setShowTelegramModal(false)}
        />
      </main>
    </div>
  );
};

export default Match3;