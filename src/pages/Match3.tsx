import { useEffect } from 'react';
import { LiveVideoPlayer } from '@/components/LiveVideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import cricketIcon from '@/assets/cricket-icon.png';

const Match3 = () => {
  const streamUrl = "https://in-mc-fdlive.fancode.com/mumbai/129734_english_hls_62195ta-di_h264/index.m3u8";

  useEffect(() => {
    document.title = "India vs England 5th Test - Skull Crick News";
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
            style={{ backgroundImage: `url(https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/2262/1753875612262-i)` }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-cricket-gold" />
              <h2 className="text-3xl md:text-4xl font-bold">India vs England</h2>
            </div>
            <p className="text-xl text-white/90">5th Test Match - India vs England Test Series 2025</p>
          </div>
        </div>

        {/* Video Player */}
        <Card className="p-6 bg-gradient-card border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Stream</h3>
            <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
              <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
              LIVE
            </Badge>
          </div>
          
          <div className="aspect-video">
            <LiveVideoPlayer 
              streamUrl={streamUrl}
              title="India vs England - 5th Test Match"
              className="w-full h-full"
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Match3;