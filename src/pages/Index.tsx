import { useEffect } from 'react';
import { LiveVideoPlayer } from '@/components/LiveVideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import cricketHero from '@/assets/cricket-hero.jpg';
import cricketIcon from '@/assets/cricket-icon.png';

const Index = () => {
  const streamUrl = "https://in-mc-fdlive.fancode.com/mumbai/127557_english_hls_64956ta-di_h264/index.m3u8";

  useEffect(() => {
    // Set page title
    document.title = "Live Cricket Stream - Australia vs West Indies 5th T20I";
    
    // Add meta tags for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch live cricket stream of Australia vs West Indies 5th T20I with live scoreboard and real-time updates.');
    }
  }, []);


  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={cricketIcon} alt="Cricket" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-foreground">CricketLive</h1>
            </div>

            {/* Live Badge */}
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${cricketHero})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-cricket-gold" />
              <h2 className="text-3xl md:text-4xl font-bold">Australia vs West Indies</h2>
            </div>
            <p className="text-xl text-white/90 mb-2">5th T20I - Australia Tour of West Indies 2025</p>
            <Badge className="bg-cricket-gold/20 text-cricket-gold border-cricket-gold/30">
              Kensington Oval, Bridgetown
            </Badge>
          </div>
        </div>

        {/* Video Player */}
        <Card className="p-6 bg-gradient-card border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Stream</h3>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              Zero Delay
            </Badge>
          </div>
          
          <div className="aspect-video">
            <LiveVideoPlayer 
              streamUrl={streamUrl}
              title="Australia vs West Indies - 5th T20I"
              className="w-full h-full"
            />
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 CricketLive. Live streaming with zero delay technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
