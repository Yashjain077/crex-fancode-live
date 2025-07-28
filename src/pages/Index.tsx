import { useEffect } from 'react';
import { LiveVideoPlayer } from '@/components/LiveVideoPlayer';
import { LiveScoreboard } from '@/components/LiveScoreboard';
import { ViewerCounter } from '@/components/ViewerCounter';
import { TelegramModal } from '@/components/TelegramModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MessageCircle, Trophy, Users, Activity } from 'lucide-react';
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

  const handleTelegramJoin = () => {
    window.open('https://t.me/your_cricket_channel', '_blank');
  };

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

            {/* Live Badge & Stats */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
                <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
                LIVE
              </Badge>
              
              <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>12.8K viewers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>5th T20I</span>
                </div>
              </div>

              <Button variant="cricket" size="sm" onClick={handleTelegramJoin}>
                <MessageCircle className="w-4 h-4" />
                Join Telegram
              </Button>
            </div>
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-card border-border/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Stream</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
                    <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
                    HD Quality
                  </Badge>
                  <Badge variant="outline">Low Latency</Badge>
                </div>
              </div>
              
              <div className="aspect-video">
                <LiveVideoPlayer 
                  streamUrl={streamUrl}
                  title="Australia vs West Indies - 5th T20I"
                  className="w-full h-full"
                />
              </div>
              
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> For best viewing experience, please install a CORS unblocking extension 
                  if the stream doesn't load properly. The stream features ultra-low latency for real-time viewing.
                </p>
              </div>
            </Card>

            {/* Match Highlights */}
            <Card className="p-6 bg-gradient-card border-border/20">
              <h3 className="text-lg font-semibold mb-4">Match Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">18.2</div>
                  <div className="text-sm text-muted-foreground">Current Over</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-cricket-gold">6</div>
                  <div className="text-sm text-muted-foreground">Last Ball</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">142</div>
                  <div className="text-sm text-muted-foreground">Target</div>
                </div>
                <div className="text-center p-3 bg-card/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">14</div>
                  <div className="text-sm text-muted-foreground">Runs Needed</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Scoreboard - Sidebar */}
          <div className="space-y-6">
            <LiveScoreboard />
            
            {/* Telegram Promotion */}
            <Card className="p-6 bg-gradient-primary text-white">
              <div className="text-center space-y-4">
                <MessageCircle className="w-12 h-12 mx-auto opacity-90" />
                <h3 className="text-lg font-semibold">Join Our Community</h3>
                <p className="text-sm text-white/90">
                  Get instant updates, highlights, and join 20K+ cricket fans!
                </p>
                <Button 
                  variant="hero" 
                  className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={handleTelegramJoin}
                >
                  <MessageCircle className="w-4 h-4" />
                  Join Telegram Channel
                </Button>
              </div>
            </Card>

            {/* Stream Stats */}
            <Card className="p-4 bg-gradient-card border-border/20">
              <h4 className="font-semibold mb-3">Stream Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="font-medium">1080p HD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-medium text-green-400">Ultra Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bitrate:</span>
                  <span className="font-medium">6000 kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">HLS</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 CricketLive. Live streaming with ultra-low latency technology.</p>
            <p className="mt-1">Join our Telegram channel for exclusive content and updates.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Components */}
      <ViewerCounter />
      <TelegramModal />
    </div>
  );
};

export default Index;
