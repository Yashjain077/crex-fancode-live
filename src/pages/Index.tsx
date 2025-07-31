import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import cricketIcon from '@/assets/cricket-icon.png';

const Index = () => {
  useEffect(() => {
    document.title = "Skull Crick News - Live Cricket Matches";
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Live Cricket Matches</h2>
          <p className="text-muted-foreground">Click on any match to watch live stream</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Match 1 Card */}
          <Link to="/match1">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/20 overflow-hidden">
              <div className="relative">
                <div 
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(https://www.fancode.com/skillup-uploads/cms-media/129732_5370_IAC_WIC_fc-App.jpg)` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
                    <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Live
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-cricket-gold" />
                  <h3 className="text-xl font-bold">India Champions vs West Indies Champions</h3>
                </div>
                <p className="text-muted-foreground">Match 15 - World Championship of Legends 2025</p>
              </div>
            </Card>
          </Link>

          {/* Match 2 Card */}
          <Link to="/match2">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/20 overflow-hidden">
              <div className="relative">
                <div 
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(https://www.fancode.com/skillup-uploads/cms-media/USA-Women-U19-tour-of-West-India,-2025_match-card.jpg)` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
                    <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Live
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-cricket-gold" />
                  <h3 className="text-xl font-bold">West Indies Women U19 vs USA Women U19</h3>
                </div>
                <p className="text-muted-foreground">USA Women U19 Tour of West Indies 2025</p>
              </div>
            </Card>
          </Link>

          {/* Match 3 Card */}
          <Link to="/match3">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/20 overflow-hidden">
              <div className="relative">
                <div 
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/2262/1753875612262-i)` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-live-red/20 text-live-red border-live-red/30">
                    <div className="w-2 h-2 bg-live-red rounded-full animate-pulse mr-2" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Live
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-cricket-gold" />
                  <h3 className="text-xl font-bold">India vs England</h3>
                </div>
                <p className="text-muted-foreground">5th Test Match - India vs England Test Series 2025</p>
              </div>
            </Card>
          </Link>
        </div>
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
