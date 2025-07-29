import { useEffect } from 'react';
import { LiveVideoPlayer } from '@/components/LiveVideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import cricketHero from '@/assets/cricket-hero.jpg';
import cricketIcon from '@/assets/cricket-icon.png';

const Index = () => {
  const match1StreamUrl = "https://in-mc-fdlive.fancode.com/mumbai/129732_english_hls_65834ta-di_h264/index.m3u8";
  const match2StreamUrl = "https://in-mc-pdlive.fancode.com/mumbai/132722_english_hls_30145ta-di_h264/index.m3u8";

  useEffect(() => {
    // Set page title
    document.title = "Skull Crick News - Live Cricket Matches";
    
    // Add meta tags for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch live cricket streams with real-time updates on Skull Crick News.');
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
              <h1 className="text-xl font-bold text-foreground">Skull Crick News</h1>
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
        {/* Hero Section - Match 1 */}
        <div className="relative rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://www.fancode.com/skillup-uploads/cms-media/129732_5370_IAC_WIC_fc-App.jpg)` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-cricket-gold" />
              <h2 className="text-3xl md:text-4xl font-bold">India Champions vs West Indies Champions</h2>
            </div>
            <p className="text-xl text-white/90 mb-2">Match 15 - World Championship of Legends 2025</p>
          </div>
        </div>

        {/* Video Player - Match 1 */}
        <Card className="p-6 bg-gradient-card border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">India Champions vs West Indies Champions - Match 15</h3>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
          
          <div className="aspect-video">
            <LiveVideoPlayer 
              streamUrl={match1StreamUrl}
              title="India Champions vs West Indies Champions - Match 15"
              className="w-full h-full"
            />
          </div>
        </Card>

        {/* Hero Section - Match 2 */}
        <div className="relative rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://www.fancode.com/skillup-uploads/cms-media/USA-Women-U19-tour-of-West-India,-2025_match-card.jpg)` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-cricket-gold" />
              <h2 className="text-3xl md:text-4xl font-bold">West Indies Women U19 vs USA Women U19</h2>
            </div>
            <p className="text-xl text-white/90 mb-2">USA Women U19 Tour of West Indies 2025</p>
          </div>
        </div>

        {/* Video Player - Match 2 */}
        <Card className="p-6 bg-gradient-card border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">West Indies Women U19 vs USA Women U19</h3>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
          
          <div className="aspect-video">
            <LiveVideoPlayer 
              streamUrl={match2StreamUrl}
              title="West Indies Women U19 vs USA Women U19"
              className="w-full h-full"
            />
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Skull Crick News. Live streaming with zero delay technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
