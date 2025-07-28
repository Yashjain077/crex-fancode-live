import { useEffect, useState } from 'react';
import { Users, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ViewerCounter = () => {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Simulate viewer count with realistic fluctuation
    const baseCount = 12847;
    const updateViewerCount = () => {
      const fluctuation = Math.floor(Math.random() * 200) - 100; // ±100 viewers
      const newCount = Math.max(1000, baseCount + fluctuation + Math.floor(Math.random() * 1000));
      setViewerCount(newCount);
    };

    updateViewerCount();
    
    // Update every 10-30 seconds with random interval
    const interval = setInterval(() => {
      updateViewerCount();
    }, Math.random() * 20000 + 10000);

    return () => clearInterval(interval);
  }, []);

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="fixed bottom-4 right-4 z-30 p-3 bg-black/80 backdrop-blur-sm border-border/20">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Eye className="w-4 h-4 text-live-red" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-live-red rounded-full animate-pulse" />
        </div>
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-white font-medium">{formatViewerCount(viewerCount)}</span>
          </div>
          <div className="text-xs text-muted-foreground">watching now</div>
        </div>
      </div>
    </Card>
  );
};